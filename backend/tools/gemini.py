from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

client = genai.Client(api_key=GEMINI_API_KEY)

def investigate_graph(jsondata : str):
    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="You are an OSINT investigator, try to infer any connections betweens nodes and summarize it to the user. Here is your info:" + jsondata
    )
