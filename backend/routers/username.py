from naminter import Naminter
from fastapi import APIRouter

router = APIRouter()

async def stream_username_data(username: str):
    async with Naminter() as naminter:
        await naminter.fetch_remote_list()
        results = await naminter.check_username(username, as_generator=True)
        async for result in results:
            # Yielding each result as a string and ensuring proper async flow
            yield f"{result}\n"

@router.get("/username/{username}")
async def get_username_stream(username: str):
    # Check if username is valid before processing (optional)
    if not username:
        raise HTTPException(status_code=400, detail="Username must be provided")

    # Return the streaming response from the async generator
    return StreamingResponse(stream_username_data(username), media_type="text/plain")

