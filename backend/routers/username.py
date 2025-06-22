from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from generators.username import combined_stream

router = APIRouter()

@router.get("/username/{username}", response_class=StreamingResponse)
async def stream_username(username: str):
    # Returns an interleaved stream from Naminter & Sherlock
    stream = combined_stream(username)
    return StreamingResponse(stream, media_type="application/json")


