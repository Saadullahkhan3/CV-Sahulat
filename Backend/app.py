# This file exists for Hugging Face Spaces compatibility
# It simply imports and runs the main FastAPI application

from main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
