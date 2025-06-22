import json
from naminter import Naminter
from naminter.models import CheckStatus

# Singleton Naminter instance
naminter = Naminter(max_tasks=200)

async def shutdown_naminter():
    # Properly exit Naminter context
    await naminter.__aexit__(None, None, None)

async def stream_naminter(username: str):
    results = await naminter.check_username(username, as_generator=True)
    async for res in results:
        if res.check_status == CheckStatus.FOUND:
            if (res.site_name == "Filmot Channel Search" or res.site_name == "Mydramalist" or res.site_name == "Sourceforge" or res.site_name == "kaskus" or res.site_name == "TorrentGalaxy" or res.site_name == "YouTube User2"):
                continue
            print(res.site_name)
            yield json.dumps({"source": "naminter", "name": res.site_name, "url": res.site_url}) + "\n"


