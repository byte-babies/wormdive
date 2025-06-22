import subprocess
import asyncio

def find_user(user):
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
    rawoutput = asyncio.run(run(f'sherlock {user}'))
    breakpoint()
    return rawoutput

print(find_user(input()))
