import requests

url = "http://localhost:8000/cv/analyze"

# Dummy CV Content
cv_content = """
John Doe
Software Engineer

Education:
- B.Sc. in CS (4 years: 2016 - 2020)

Professional Experience:
- Full Stack Developer at Tech Co (2 years: 2021 - 2023)
- Junior Dev at StartUp Inc (1 year: 2020 - 2021)

Projects:
- Portfolio Website (6 months)
- E-commerce App (3 months)
"""

# Dummy Job Description
job_description = """
Requirements:
- 5+ years of Industry Experience.
"""

files = {
    'file': ('cv.txt', cv_content, 'text/plain')
}
data = {
    'job_description': job_description
}

try:
    response = requests.post(url, files=files, data=data)
    print(f"Status Code: {response.status_code}")
    print("Response JSON:")
    print(response.json())
except Exception as e:
    print(f"Error: {e}")
