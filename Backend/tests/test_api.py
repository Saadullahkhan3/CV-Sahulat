import requests as rq



import io 
from typing import BinaryIO
import os
import mimetypes

if mode:=input("Enter mode 1 for dev and 2 for production mode: ").strip().lower() == "1":
    URL = "http://127.0.0.1:8080/"
else:
    URL = "https://saadullahkhan3-cv-sahulat.hf.space/"

# def send_post():
#     pass 
print(URL)
print(rq.get(URL))
cv_file = r"D:\Learning\BanoQabil 4.0 - DevOps\CVSahulat\hidden\SaadullahKhan_Software_Developer.pdf"
job_desc_file = r"D:\Learning\BanoQabil 4.0 - DevOps\CVSahulat\hidden\job_desc_example.png"
# exit()



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

