import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("❌ No GROQ_API_KEY found in .env")
else:
    print(f"Testing key: {api_key[:10]}...")
    try:
        client = Groq(api_key=api_key)
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": "Hello"}],
            model="llama-3.3-70b-versatile",
        )
        print("✅ API Key is VALID!")
        print(f"Response: {chat_completion.choices[0].message.content}")
    except Exception as e:
        print(f"❌ API Key is INVALID or failed.")
        print(f"Error: {e}")
