# OCR Server - Docker Setup

A FastAPI-based OCR server that can extract text from images (PNG, JPG, JPEG, WEBP) and PDF files using Tesseract and Poppler.

## Prerequisites

- Docker and Docker Compose installed on your system

## Quick Start

### Method 1: Using Docker Compose (Recommended)

1. Clone/navigate to the project directory
2. Build and run the container:

   ```bash
   docker-compose up --build
   ```

3. The API will be available at: `http://localhost:8080`
4. API documentation: `http://localhost:8080/docs`

### Method 2: Using Docker directly

1. Build the Docker image:

   ```bash
   docker build -t ocr-server .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 ocr-server
   ```

## API Endpoints

- `GET /` - Health check endpoint
- `POST /ocr` - Upload and process files for OCR

## Testing the API

You can test the API using:

1. **Browser**: Go to `http://localhost:8080/docs` for Swagger UI
2. **curl**:
   ```bash
   curl -X POST "http://localhost:8080/ocr" \
        -H "accept: application/json" \
        -H "Content-Type: multipart/form-data" \
        -F "file=@your_image_or_pdf.pdf"
   ```

## Supported File Types

- **Images**: PNG, JPG, JPEG, WEBP
- **Documents**: PDF

## Configuration

The application automatically detects the environment:

- **Windows**: Uses local Tesseract and Poppler installations
- **Docker/Linux**: Uses system-installed packages

## Dependencies Included in Docker

- Python 3.11
- Tesseract OCR
- Poppler Utils
- OpenCV dependencies
- FFmpeg (for video processing if needed)

## Development

For local development without Docker, you'll need to manually install:

- Tesseract OCR
- Poppler Utils
- Python dependencies from `requirements.txt`

## Stopping the Service

- Docker Compose: `docker-compose down`
- Docker: `Ctrl+C` in the terminal or `docker stop <container_id>`
