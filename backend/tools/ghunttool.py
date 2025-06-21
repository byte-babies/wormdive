from ghunt.apis.peoplepa import PeoplePaHttp
from ghunt.objects.base import GHuntCreds

import httpx
import asyncio

print("Enter email: ", end="")

async def reader(email):
    as_client = httpx.AsyncClient() # Async Client
    ghunt_creds = GHuntCreds()
    ghunt_creds.load_creds()
    people_api = PeoplePaHttp(ghunt_creds)
    found, person = await people_api.people_lookup(as_client, email, params_template="just_name") 
    print("Found :", found)
    print(person)
    if (found):
        # printing out the email:
        email = dict(person.emails.items())['PROFILE'].value
        # printing out the GAIA ID:
        gaiaid = person.personId
        breakpoint()
        play_games = person.play_games
        profilephotos = dict(person.profilePhotos)['PROFILE'].url
        coverPhotos = dict(person.coverPhotos)['PROFILE'].url
    else:
        print("NOT FOUND!")

asyncio.run(reader(input()))
