from ghunt.apis.peoplepa import PeoplePaHttp
from ghunt.objects.base import GHuntCreds
import subprocess
import asyncio

print("Enter email: ", end="")
email = input()

async def run(cmd):
    proc = await asyncio.create_subprocess_shell(
        cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE)

    stdout, stderr = await proc.communicate()

    print(f'[{cmd!r} exited with {proc.returncode}]')
    if stdout:
        return stdout.decode()
    if stderr:
        return stderr.decode()

output = asyncio.run(run(f'ghunt email {email}'))
print(output)
