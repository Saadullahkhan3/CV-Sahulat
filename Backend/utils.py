import numpy as np
import pytesseract
import cv2
from pdf2image import convert_from_bytes
import pdfplumber
from io import BytesIO
from typing import Tuple, Optional
import logging
from config import settings

# Get logger
logger = logging.getLogger("ocr_api")


class OCRProcessor:
    
    def __init__(self):
        pytesseract.pytesseract.tesseract_cmd = settings.TESSERACT_CMD
    
    def extract_text_from_file(self, file_content: bytes, content_type: str, filename: str) -> str:
        try:
            if content_type == settings.SUPPORTED_PDF_TYPE:
                return self._process_pdf(file_content)
            
            elif content_type in settings.SUPPORTED_IMAGE_TYPES:
                return self._process_image(file_content)
            
            elif not content_type or content_type == "":
                return self._process_by_extension(file_content, filename)
            
            else:
                raise ValueError("Invalid file format. Please upload a PDF, PNG, JPG, JPEG or WEBP file.")
                
        except ValueError:
            raise
        except Exception as e:
            logger.error(f"Error in OCR processing: {e}", exc_info=True)
            raise Exception(f"Failed to process file: {str(e)}")
    
    def _process_pdf(self, file_content: bytes) -> str:
        extracted_text = ""
        
        try:
            extracted_text = self._extract_selectable_text_from_pdf(file_content)
            
            if not extracted_text.strip():
                logger.info("No selectable text found, falling back to OCR")
                extracted_text = self._extract_text_from_pdf_via_ocr(file_content)
            else:
                logger.info(f"Successfully extracted {len(extracted_text)} characters of selectable text")
                
        except Exception as pdf_error:
            logger.warning(f"Error extracting PDF text with pdfplumber: {pdf_error}, falling back to OCR")
            extracted_text = self._extract_text_from_pdf_via_ocr(file_content)
        
        return extracted_text
    
    def _extract_selectable_text_from_pdf(self, file_content: bytes) -> str:
        extracted_text = ""
        file_bytes = BytesIO(file_content)
        
        with pdfplumber.open(file_bytes) as pdf:
            for page_num, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text and page_text.strip():
                    extracted_text += page_text + "\n\n"
                    logger.debug(f"Extracted selectable text from page {page_num + 1}")
        
        return extracted_text
    
    def _extract_text_from_pdf_via_ocr(self, file_content: bytes) -> str:
        extracted_text = ""
        images = convert_from_bytes(file_content, poppler_path=settings.POPPLER_PATH)
        
        for i, image in enumerate(images):
            text = pytesseract.image_to_string(image)
            extracted_text += text + "\n\n"
            logger.debug(f"OCR processed page {i + 1}")
        
        return extracted_text
    
    def _process_image(self, file_content: bytes) -> str:
        img = cv2.imdecode(np.frombuffer(file_content, np.uint8), cv2.IMREAD_COLOR)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        extracted_text = pytesseract.image_to_string(gray)
        logger.debug("OCR processed image")
        
        return extracted_text
    
    def _process_by_extension(self, file_content: bytes, filename: str) -> str:
        file_extension = self._get_file_extension(filename)
        
        if file_extension in settings.SUPPORTED_IMAGE_EXTENSIONS:
            extracted_text = self._process_image(file_content)
            logger.debug("OCR processed image (detected by extension)")
            return extracted_text
            
        elif file_extension == settings.SUPPORTED_PDF_EXTENSION:
            return self._process_pdf(file_content)
        
        else:
            raise ValueError("Invalid file format. Please upload a PDF, PNG, JPG, JPEG or WEBP file.")
    
    def _get_file_extension(self, filename: str) -> str:
        return filename.lower().split('.')[-1] if '.' in filename else ''
    
    def validate_file_type(self, content_type: str, filename: str) -> Tuple[bool, str]:
        if content_type == settings.SUPPORTED_PDF_TYPE:
            return True, ""
        
        if content_type in settings.SUPPORTED_IMAGE_TYPES:
            return True, ""
        
        if not content_type or content_type == "":
            file_extension = self._get_file_extension(filename)
            
            if file_extension in settings.SUPPORTED_IMAGE_EXTENSIONS or file_extension == settings.SUPPORTED_PDF_EXTENSION:
                return True, ""
        
        return False, "Invalid file format. Please upload a PDF, PNG, JPG, JPEG or WEBP file."
    
    def get_processing_info(self, content_type: str, filename: str) -> dict:
        file_extension = self._get_file_extension(filename)
        
        info = {
            "filename": filename,
            "content_type": content_type,
            "file_extension": file_extension,
            "processing_method": "unknown"
        }
        
        if content_type == settings.SUPPORTED_PDF_TYPE or file_extension == settings.SUPPORTED_PDF_EXTENSION:
            info["processing_method"] = "PDF (selectable text extraction + OCR fallback)"
        elif content_type in settings.SUPPORTED_IMAGE_TYPES or file_extension in settings.SUPPORTED_IMAGE_EXTENSIONS:
            info["processing_method"] = "Image OCR with OpenCV preprocessing"
        
        return info


# Singleton instance for easy import
ocr_processor = OCRProcessor()