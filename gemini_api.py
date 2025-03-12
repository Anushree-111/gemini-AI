import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is missing. Check your .env file.")

genai.configure(api_key=GOOGLE_API_KEY)

def text_only(prompt: str):
    # Use the text-based Gemini model
    model = genai.GenerativeModel("gemini-1.5-pro-latest")


    response = model.generate_content(prompt)

    if not response or not response.text:
        return "Error: No response generated."

    return response.text  # Returning plain text
