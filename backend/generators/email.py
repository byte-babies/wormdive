from .naminter import stream_naminter
from .sherlock import stream_sherlock

async def combined_stream(username: str):
    # Interleave two async generators
    it1 = stream_naminter(username).__aiter__()
    it2 = stream_sherlock(username).__aiter__()
    streams = [it1, it2]
    while streams:
        for it in streams.copy():
            try:
                chunk = await it.__anext__()
                yield chunk
            except StopAsyncIteration:
                streams.remove(it)

