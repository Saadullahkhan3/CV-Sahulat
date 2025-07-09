import os
from pathlib import Path
import platform



# Configuration settings
class Settings:
    # Windows Config
    if os.name == "nt" or platform.system() == "Windows":
        TESSERACT_CMD = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        POPPLER_PATH = r"D:\Learning\Img to Docs\work\poppler-24.08.0\Library\bin"

    # Linux or Docker Config
    else:
        # Tesseract configuration (Docker/Linux - tesseract will be in PATH)
        TESSERACT_CMD = "tesseract"
        
        # Poppler configuration for PDF processing (Docker/Linux - poppler-utils will be in PATH)
        POPPLER_PATH = None

        os.environ["HF_HOME"] = "/tmp/huggingface"
        os.environ["TRANSFORMERS_CACHE"] = "/tmp/huggingface"
        os.environ["HF_DATASETS_CACHE"] = "/tmp/huggingface"
    
    # File upload limits
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
    
    # Supported file types
    SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"]
    SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
    SUPPORTED_PDF_TYPE = "application/pdf"
    SUPPORTED_PDF_EXTENSION = 'pdf'
    
    # API configuration
    APP_TITLE = "CV_Sahulat"
    APP_DESCRIPTION = "OCR API for extracting text from images and PDFs"
    APP_VERSION = "1.0.0"

settings = Settings()
