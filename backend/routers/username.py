from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from generators.username import combined_stream, get_all_results, clear_results
from helpers.gemini import get_ai_insights
import json

router = APIRouter()

@router.get("/username/{username}", response_class=StreamingResponse)
async def stream_username(username: str):
    # Returns an interleaved stream from Naminter & Sherlock
    # Results are automatically stored in global_results_store during streaming
    stream = combined_stream(username)
    return StreamingResponse(stream, media_type="application/json")

@router.get("/api/username/{username}/analyze")
async def analyze_username_results(username: str):
    """
    Get AI analysis using results from global store (no duplicate scraping)
    """
    try:
        # Get results from global store (already collected during streaming)
        results = await get_all_results(username)
        print(f"Retrieved {len(results)} results from global store for {username}")
        
        # Use Gemini to analyze the results
        insights = await get_ai_insights(username, results)
        
        return {
            "username": username,
            "results": results,
            "ai_analysis": insights,
            "total_profiles_found": len(results)
        }
    except Exception as e:
        return {
            "error": f"Failed to analyze results: {str(e)}",
            "username": username,
            "results": [],
            "ai_analysis": None
        }

@router.delete("/api/username/{username}/clear")
async def clear_username_results(username: str):
    """
    Clear results for a specific username from global store
    """
    try:
        clear_results(username)
        return {"message": f"Cleared results for {username}"}
    except Exception as e:
        return {"error": f"Failed to clear results: {str(e)}"}

@router.delete("/api/clear-all")
async def clear_all_results():
    """
    Clear all results from global store
    """
    try:
        clear_results()
        return {"message": "Cleared all results"}
    except Exception as e:
        return {"error": f"Failed to clear all results: {str(e)}"}


