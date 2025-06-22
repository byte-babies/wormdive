from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from generators.email import combined_stream

router = APIRouter()

@router.get("/email/{email}", response_class=StreamingResponse)
async def stream_username(username: str):
    # Returns an interleaved stream
    stream = combined_stream(email)
    return StreamingResponse(stream, media_type="application/json")


