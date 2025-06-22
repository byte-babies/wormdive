from dotenv import load_dotenv
import os
load_dotenv()
secret_key = os.getenv('HUNTERKEY')
import requests

def find_name(firstname, lastname):
    leads = set()
    otherimportant = set()
    r = requests.get(f"https://api.hunter.io/v2/email-finder?domain=stripe.com&first_name={firstname}&last_name={lastname}&api_key={secret_key}")
    myjson = r.json()
    #leads.add(myjson.data.email)
    #otherimportant.add(myjson.data.domain)
    # parse the json
    return myjson

def find_email(email):
    r = requests.get(f"https://api.hunter.io/v2/email-verifier?email={email}&api_key={secret_key}")
    return r.json()

print(find_name("asdsaijdajdiwasdk", "Salach"))

print("----------")
print("----------")
print("----------")
print("----------")
print("----------")

print(find_email("didital@gmail.com"))
#breakpoint()
