import json
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is required")

client = genai.Client(api_key=GEMINI_API_KEY)

async def summarize_social_media_results(username: str, results: list) -> str:
    """
    Use Gemini to analyze and summarize social media search results
    
    Args:
        username: The username that was searched
        results: List of social media profiles found
        
    Returns:
        A summary string from Gemini
    """
    if not results:
        return "No social media profiles found for this username."
    
    # Prepare the data for Gemini
    data = {
        "username": username,
        "total_profiles_found": len(results),
        "profiles": results,
        "sources": list(set(result.get("source", "unknown") for result in results)),
        "platforms": list(set(result.get("name", "unknown") for result in results))
    }
    
    # Create the prompt for Gemini
    prompt = f"""
    You are an OSINT (Open Source Intelligence) investigator analyzing social media presence.
    
    Please analyze the following data and provide a comprehensive summary:
    
    Username: {username}
    Total profiles found: {len(results)}
    Data sources: {', '.join(data['sources'])}
    
    Social Media Profiles Found:
    {json.dumps(results, indent=2)}
    
    Please provide:
    1. A brief overview of the user's online presence
    2. Key platforms where they are most active
    3. Any notable patterns or insights
    4. Privacy and security considerations
    5. A risk assessment (low/medium/high) based on the amount of information found
    
    Keep the summary concise but informative, suitable for a security analyst.
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )
        
        return response.text
    except Exception as e:
        return f"Error generating summary: {str(e)}"

async def get_ai_insights(username: str, results: list) -> dict:
    """
    Get AI-powered insights about the social media search results
    
    Args:
        username: The username that was searched
        results: List of social media profiles found
        
    Returns:
        Dictionary containing summary and insights
    """
    summary = await summarize_social_media_results(username, results)
    
    return {
        "summary": summary,
        "total_profiles": len(results),
        "sources_used": list(set(result.get("source", "unknown") for result in results)),
        "platforms_found": list(set(result.get("name", "unknown") for result in results)),
        "username": username
    } 