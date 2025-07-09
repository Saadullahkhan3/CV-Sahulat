import os
from pathlib import Path
import sys 



# Configuration settings
class Settings:
    # Windows Config
    if sys.getwindowsversion():
        TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        POPPLER_PATH = r"D:\Learning\Img to Docs\work\poppler-24.08.0\Library\bin"
    else:
        # Tesseract configuration (Docker/Linux - tesseract will be in PATH)
        TESSERACT_CMD = "tesseract"
        
        # Poppler configuration for PDF processing (Docker/Linux - poppler-utils will be in PATH)
        POPPLER_PATH = None
    
    # File upload limits
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
    
    # Supported file types
    SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"]
    SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
    SUPPORTED_PDF_TYPE = "application/pdf"
    SUPPORTED_PDF_EXTENSION = 'pdf'
    
    # API configuration
    API_TITLE = "OCR API"
    API_DESCRIPTION = "OCR API for extracting text from images and PDFs"
    API_VERSION = "1.0.0"

settings = Settings()
