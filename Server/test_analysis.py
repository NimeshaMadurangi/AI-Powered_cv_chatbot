import requests

url = "http://localhost:8000/cv/analyze"

# Dummy CV Content
cv_content = """
Nimesha Madurangi
Software Engineer

Professional Experience:
- Trainee Backend Developer at Alpha (2024 Feb - 2025 Jan)
- Intern Backend Developer at Beta (2025 May - 2026 Jan)
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
