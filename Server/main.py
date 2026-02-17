import os
import json
import uvicorn
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from pyngrok import ngrok
import groq
import PyPDF2
import io

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Groq API
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    # Fallback/Empty client to allow server to start, but requests will fail if key isn't set
    print("WARNING: GROQ_API_KEY is not set in .env file")
    client = None
else:
    client = groq.Groq(api_key=api_key)

model_name = "llama-3.3-70b-versatile" # Current supported model

class CVRequest(BaseModel):
    cv_text: str
    job_description: str

@app.get("/")
def read_root():
    return {"message": "AI CV Chatbot Backend is Running with Groq (Llama 3)"}

def extract_text_from_pdf(file_content):
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

@app.post("/cv/tailor")
async def tailor_cv(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not client:
        raise HTTPException(status_code=500, detail="Server Configuration Error: GROQ_API_KEY not found.")

    try:
        # 1. Read file content
        content = await file.read()
        
        # 2. Extract text (PDF or Text)
        if file.filename.endswith(".pdf"):
            cv_text = extract_text_from_pdf(content)
        else:
            cv_text = content.decode("utf-8")

        if not cv_text:
             raise HTTPException(status_code=400, detail="Could not extract text from the uploaded file.")

        # 3. Construct Prompt for Groq
        system_prompt = "You are an expert CV writer and career coach. Your goal is to tailor a CV to a specific job description."
        user_prompt = f"""
        I will provide a CV and a Job Description.
        Your task:
        1. Analyze the Job Description to identify key skills and requirements.
        2. Rewrite the CV to highlight relevant experience and skills that match the Job Description.
        3. Optimize for ATS (Applicant Tracking Systems).
        4. Return the result strictly as a JSON object with this structure:
        {{
            "personal_info": {{ 
                "name": "...", 
                "email": "...", 
                "phone": "...", 
                "linkedin": "..." (if available, otherwise omit),
                "github": "..." (if available, otherwise omit)
            }},
            "summary": "...",
            "skills": ["...", "..."],
            "experience": [
                {{ "title": "...", "company": "...", "duration": "...", "description": ["...", "..."] }}
            ],
            "education": [
                {{ "degree": "...", "school": "...", "year": "..." }}
            ]
        }}

        Do NOT include markdown formatting (like ```json). Just return the raw JSON string.

        CV Content:
        {cv_text[:10000]}

        Job Description:
        {job_description[:5000]}
        """

        # 4. Call Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model=model_name,
            temperature=0.2, # Low temperature for more deterministic/structured output
            response_format={"type": "json_object"}, # Enforce JSON mode
        )

        response_text = chat_completion.choices[0].message.content

        # 5. Parse JSON
        try:
            tailored_cv = json.loads(response_text)
            return tailored_cv
        except json.JSONDecodeError:
            # Fallback cleanup if model includes markdown code blocks
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            try:
                tailored_cv = json.loads(clean_text)
                return tailored_cv
            except:
                raise HTTPException(status_code=500, detail=f"Failed to parse API response: {response_text}")

    except Exception as e:
        print(f"Error tailoring CV: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cv/cover-letter")
async def generate_cover_letter(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not client:
        raise HTTPException(status_code=500, detail="Server Configuration Error: GROQ_API_KEY not found.")

    try:
         # 1. Read file content
        content = await file.read()
        
        # 2. Extract text (PDF or Text)
        if file.filename.endswith(".pdf"):
            cv_text = extract_text_from_pdf(content)
        else:
            cv_text = content.decode("utf-8")
        
        system_prompt = "You are a professional cover letter writer."
        user_prompt = f"""
        Write a professional cover letter for this candidate based on their CV and the Job Description.
        
        CV Content:
        {cv_text[:5000]}

        Job Description:
        {job_description[:2000]}

        The cover letter should be engaging, professional, and highlight why the candidate is a perfect fit.
        Return ONLY the cover letter text, no other conversational filler.
        """

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model=model_name,
            temperature=0.7,
        )
        
        return {"cover_letter": chat_completion.choices[0].message.content}

    except Exception as e:
        print(f"Error generating cover letter: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/cv/analyze")
async def analyze_cv(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not client:
        raise HTTPException(status_code=500, detail="Server Configuration Error: GROQ_API_KEY not found.")

    try:
        # 1. Read file content
        content = await file.read()
        
        # 2. Extract text (PDF or Text)
        if file.filename.endswith(".pdf"):
            cv_text = extract_text_from_pdf(content)
        else:
            cv_text = content.decode("utf-8")
        
        if not cv_text:
             raise HTTPException(status_code=400, detail="Could not extract text from the uploaded file.")

        # 3. Construct Prompt for Groq
        system_prompt = "You are an expert HR recruiter and ATS specialist."
        user_prompt = f"""
        Analyze the following CV against the provided Job Description.
        
        Your goal is to determine if the candidate is a good match for the role.
        
        Return the result strictly as a JSON object with this structure:
        {{
            "match_percentage": 85,
            "reasoning": "Brief explanation of the score.",
            "missing_skills": ["Skill 1", "Skill 2"],
            "recommendation": "Highly Recommended" | "Recommended" | "Not Recommended"
        }}

        Do NOT include markdown formatting. Just return the raw JSON string.

        CV Content:
        {cv_text[:10000]}

        Job Description:
        {job_description[:5000]}
        """

        # 4. Call Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                }
            ],
            model=model_name,
            temperature=0.2,
            response_format={"type": "json_object"},
        )

        response_text = chat_completion.choices[0].message.content

        # 5. Parse JSON
        try:
            analysis_result = json.loads(response_text)
            return analysis_result
        except json.JSONDecodeError:
            clean_text = response_text.replace("```json", "").replace("```", "").strip()
            try:
                analysis_result = json.loads(clean_text)
                return analysis_result
            except:
                raise HTTPException(status_code=500, detail=f"Failed to parse Analysis API response: {response_text}")

    except Exception as e:
        print(f"Error analyzing CV: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Setup ngrok
    port = 8000
    try:
        public_url = ngrok.connect(port).public_url
        print(f"ngrok tunnel \"{public_url}\" -> \"http://127.0.0.1:{port}\"")
    except Exception as e:
        print(f"Could not connect ngrok: {e}")
        print("Ensure you have an NGROK_AUTHTOKEN set if required.")

    uvicorn.run(app, host="0.0.0.0", port=port)
