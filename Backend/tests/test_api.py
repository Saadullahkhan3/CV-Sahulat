import requests as rq


# print(rq.__version__)

import io 
from typing import BinaryIO
import os
import mimetypes

URL = "http://0.0.0.0:8080/"
URL = "http://127.0.0.1:8080/"

# def send_post():
#     pass 
print(URL)
print(rq.get(URL))
cv_file = r"D:\Learning\BanoQabil 4.0 - DevOps\CVSahulat\hidden\SaadullahKhan_Software_Developer.pdf"
job_desc_file = r"D:\Learning\BanoQabil 4.0 - DevOps\CVSahulat\hidden\job_desc_example.png"
# exit()

# a = io.FileIO(cv_file)
# print(type(a))
# b = open(cv_file, "rb")
# print(type(b))
# c = io.BytesIO()

# exit()
# Get the MIME type based on file extension
# content_type, _ = mimetypes.guess_type(job_desc_file)
# if content_type is None:
#     content_type = 'application/octet-stream'  # fallback
# with open(job_desc_file, "rb") as file:
#     files = {"job_desc_file": (os.path.basename(job_desc_file), file, content_type)}
#     print(f"Sending file with content type: {files}")
#     response = rq.post(URL+"analyze/", data={"cv_text": "CV CV"}, files=files, timeout=30)
# print(response.json())


print("\n\nCV as Text and Job Desc as Text:")
r = rq.post(URL+"analyze/", data={"cv_text": "CV CV", "job_desc_text": "JOB JOB"})
print(r.status_code, r.json())

print("\n\nCV as Text and Job Desc as File:")
r = rq.post(URL+"analyze/", data={"cv_text": "CV CV"}, files={"job_desc_file": open(job_desc_file, "rb")})
print(r.status_code, r.json())

print("\n\nCV as File and Job Desc as File:")
r = rq.post(URL+"analyze/", files={"cv_file": open(cv_file, "rb"), "job_desc_file": open(job_desc_file, "rb")})
print(r.status_code, r.json())

print("\n\nCV as File and Job Desc as Text:")
r = rq.post(URL+"analyze/", data={"job_desc_text": "JOB JOB"}, files={"cv_file": open(cv_file, "rb")})
print(r.status_code, r.json())

