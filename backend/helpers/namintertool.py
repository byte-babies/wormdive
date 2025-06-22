import asyncio
from naminter import Naminter

def name_find(username : str):
    async def main():
        async with Naminter(max_tasks=200) as naminter:
            await naminter.fetch_remote_list()
            results = await naminter.check_username(username)
            for result in results:
                print(result)
    return asyncio.run(main())
    
print(name_find("Yoshixi"))

#import subprocess
#import asyncio
#
#def find_email(user):
#    async def run(cmd):
#        proc = await asyncio.create_subprocess_shell(
#            cmd,
#            stdout=asyncio.subprocess.PIPE,
#            stderr=asyncio.subprocess.PIPE)
#    
#        stdout, stderr = await proc.communicate()
#    
#        print(f'[{cmd!r} exited with {proc.returncode}]')
#        if stdout:
#            return stdout.decode()
#        if stderr:
#            return stderr.decode()
#    rawoutput = asyncio.run(run(f'naminter {user} -m 500'))
#    return rawoutput
#
#print(find_email(input()))
