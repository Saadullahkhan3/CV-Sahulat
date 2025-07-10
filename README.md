---
title: CV Sahulat
emoji: 📄
colorFrom: yellow
colorTo: indigo
sdk: docker
sdk_version: "latest"
app_file: app.py
pinned: true
---

# CV Sahulat

CV Sahulat is a web application that helps you analyze your Resume (CV) against a Job Description. It uses OCR (Optical Character Recognition) to extract text from images and PDFs, and provides a simple interface for comparison.

---

## 🚀 Technologies Used

- **Frontend:** 
  Next.js, A modern React framework for building fast, interactive user interfaces.  
  _Deployed on [Vercel](https://cv-sahulat.vercel.app/)_

- **Backend:** 
  FastAPI based, A high-performance Python framework for building APIs, handling OCR and analysis.  
  Deployed on Hugging Face Spaces: https://saadullahkhan3-cv-sahulat.hf.space/

- **OCR:** [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) & [Poppler](https://poppler.freedesktop.org/)  
  Used for extracting text from images and PDF files.

---

## ✨ How to Use

### 1. Try the Web App

- Go to [cv-sahulat.vercel.app](https://cv-sahulat.vercel.app/)
- Upload your CV (as a file or paste text)
- Upload the job description (as a file or paste text)
- Click **Analyze** to get instant insights and comparison

### 2. Use the API Directly

The backend exposes an `/analyze` API endpoint for programmatic access.

**Endpoint:**  
`POST https://saadullahkhan3-cv-sahulat.hf.space/analyze`

**Request (multipart/form-data):**
- `cv_file`: (optional) CV file (PDF, JPG, PNG, WEBP)
- `cv_text`: (optional) CV as plain text
- `job_desc_file`: (optional) Job description file (PDF, JPG, PNG, WEBP)
- `job_desc_text`: (optional) Job description as plain text

_You must provide at least one of `cv_file` or `cv_text`, and one of `job_desc_file` or `job_desc_text`._

**Example using `curl`:**
```bash
curl -X POST "https://saadullahkhan3-cv-sahulat.hf.space/analyze" \
  -F "cv_file=@your_cv.pdf" \
  -F "job_desc_text=Software Engineer with Python experience"
```

**Sample Response:**
```json
{
  "analyzed_text": "Your CV matches the job description by 80%..."
}
```