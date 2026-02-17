import requests

url = "http://localhost:8000/cv/analyze"

# Dummy CV Content
cv_content = """
John Doe
Software Engineer
Skills: Python, React, JavaScript, SQL
Experience:
- 3 years at Tech Co as Full Stack Developer
"""

# Dummy Job Description
job_description = """
We are looking for a Software Engineer with experience in Python and React.
Must have strong knowledge of SQL and API development.
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
