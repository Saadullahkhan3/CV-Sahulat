---
title: OCR Server - CVSahulat
emoji: 📄
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 8080
app_file: app.py
pinned: false
---

# OCR Server - FastAPI

A FastAPI-based OCR (Optical Character Recognition) server that extracts text from images and PDF files.

## Features

- Extract text from images (PNG, JPEG, WEBP)
- Extract text from PDF files (with smart fallback from selectable text to OCR)
- RESTful API with automatic documentation
- Error handling and validation
- Configurable settings

## Prerequisites

Before running this application, make sure you have:

1. **Tesseract OCR** installed on your system

   - Download from: https://github.com/tesseract-ocr/tesseract
   - Install to: `C:\Program Files\Tesseract-OCR\` (Windows)

2. **Poppler** for PDF processing

   - Download from: https://blog.alivate.com.au/poppler-windows/
   - Extract to a folder and note the path to the `bin` directory

3. **Python 3.8+** installed

## Installation

1. Clone or download this repository
2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Update the paths in `config.py`:
   - `TESSERACT_CMD`: Path to your Tesseract executable
   - `POPPLER_PATH`: Path to your Poppler bin directory

## Usage

### For Hugging Face Spaces

This space runs automatically on Hugging Face using Docker. Simply use the interface above or make API calls to:

**API Endpoints:**

#### POST /ocr

Extract text from an uploaded file.

**Example using curl:**

```bash
curl -X POST "https://huggingface.co/spaces/Saadullahkhan3/CVSahulat/api/ocr" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@your_file.pdf"
```

#### GET /

Health check endpoint - returns API status.

### For Local Development

```bash
python main.py
```

The server will start on `http://localhost:8080`

## Supported File Types

- **Images**: PNG, JPEG, JPG, WEBP
- **Documents**: PDF

## Configuration

Edit `config.py` to modify:

- Tesseract and Poppler paths
- File size limits
- Supported file types
- API metadata

## Testing

Run the test script:

```bash
python test_api.py
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad request (invalid file type, no file provided)
- `500`: Internal server error

## Notes

- For PDF files, the API first tries to extract selectable text, then falls back to OCR if needed
- Large files may take longer to process
- Make sure Tesseract and Poppler are properly installed and paths are correctly configured
