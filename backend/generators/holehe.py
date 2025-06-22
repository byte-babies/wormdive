import json
import asyncio
from asyncio.subprocess import PIPE
 
async def stream_holehe(email: str):
    proc = await asyncio.create_subprocess_exec(
        "holehe", email,
        stdout=PIPE,
        stderr=asyncio.subprocess.DEVNULL,
    )

    async for line in proc.stdout:
        line = line.decode()
        split_line = line.split()
        if len(split_line) == 2 and split_line[0] == "[+]":
            name = split_line[1]

            yield json.dumps({"source": "holehe", "name": name, "url": ""}) + "\n"

# import logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)
# 
# def holher(email :str):
#     async def stream_holehe(email: str):
#         proc = await asyncio.create_subprocess_exec(
#             "holehe", email,
#             stdout=PIPE,
#             stderr=asyncio.subprocess.DEVNULL,
#         )
#     
#         async for line in proc.stdout:
#             logger.debug(f"THIS IS: {line}\n")
#             line = line.decode()
#             split_line = line.split()
#             if len(split_line) == 2 and split_line[0] == "[+]":
#                 logger.debug(f"GOOOD!\n")
#                 name = split_line[1][:-1]
#                 url = split_line[2]
#     
#                 #yield json.dumps({"source": "holehe", "name": name, "url": url}) + "\n"
#                 continue
#     asyncio.run(stream_holehe(email))
# holher(input())