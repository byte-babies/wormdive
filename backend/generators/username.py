from .naminter import stream_naminter
from .sherlock import stream_sherlock
from .holehe import stream_holehe


async def combined_stream(username: str, email : str):
    streams = []
    
    if (email):
        it3 = stream_holehe(email).__aiter__()
        streams.append(it3)
    if (username):
        it1 = stream_naminter(username).__aiter__()
        it2 = stream_sherlock(username).__aiter__()
        streams.append(it1)
        streams.append(it2)
        

    while streams:
        for i, it in enumerate(streams.copy()):
            try:
                chunk = await it.__anext__()
                yield chunk
            except StopAsyncIteration:
                streams.remove(it)
            except Exception as e:
                streams.remove(it)

