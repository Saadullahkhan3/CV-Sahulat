from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from config import settings

from logger import setup_logger

from ocr import ocr_processor
from analyzer import analyzer




# Initialize logger
logger = setup_logger()


app = FastAPI(
    title=settings.APP_TITLE, 
    description=settings.APP_DESCRIPTION, 
    version=settings.APP_VERSION
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "CV Sahulat is running!", "version": "1.0.0"}

# New endpoint for analyzing CV and Job Description
@app.post("/analyze")
async def analyze(
    cv_file: Optional[UploadFile] = File(None),
    cv_text: Optional[str] = Form(None),
    job_desc_file: Optional[UploadFile] = File(None),
    job_desc_text: Optional[str] = Form(None),
):
    """
    Extract text from CV and job description, each can be file upload or direct text.
    """
    # Validate CV input
    if not cv_file and not cv_text:
        raise HTTPException(status_code=400, detail="Either 'cv_file' or 'cv_text' must be provided")
    if cv_file and cv_text:
        raise HTTPException(status_code=400, detail="Provide either 'cv_file' or 'cv_text', not both")

    # Validate job input
    if not job_desc_file and not job_desc_text:
        raise HTTPException(status_code=400, detail="Either 'job_desc_file' or 'job_desc_text' must be provided")
    if job_desc_file and job_desc_text:
        raise HTTPException(status_code=400, detail="Provide either 'job_desc_file' or 'job_desc_text', not both")

    # Process CV
    if cv_text:
        extracted_cv = cv_text
    else:
        is_valid, err = ocr_processor.validate_file_type(cv_file.content_type, cv_file.filename)
        if not is_valid:
            raise HTTPException(status_code=400, detail=err)
        content = await cv_file.read()
        extracted_cv = ocr_processor.extract_text_from_file(content, cv_file.content_type, cv_file.filename)

    # Process Job Description
    if job_desc_text:
        extracted_job = job_desc_text
    else:
        is_valid, err = ocr_processor.validate_file_type(job_desc_file.content_type, job_desc_file.filename)
        if not is_valid:
            raise HTTPException(status_code=400, detail=err)
        content = await job_desc_file.read()
        extracted_job = ocr_processor.extract_text_from_file(content, job_desc_file.content_type, job_desc_file.filename)

    analyzed_text = analyzer(extracted_cv, extracted_job)

    return JSONResponse(
        content={"analyzed_text": analyzed_text},
        # content={"cv_text": extracted_cv, "job_desc_text": extracted_job},
        status_code=200
    )


if __name__ == "__main__":
    import uvicorn
    logger.info(f"Starting {settings.APP_TITLE} server...")
    uvicorn.run(app, host="0.0.0.0", port=8080)
