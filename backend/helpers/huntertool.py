from dotenv import load_dotenv
import os
load_dotenv()
secret_key = os.getenv('HUNTERKEY')
import requests

def find_name(firstname, lastname):
    r = requests.get(f"https://api.hunter.io/v2/email-finder?domain=reddit.com&first_name={firstname}&last_name={lastname}&api_key={secret_key}")
    return r.json()

def find_email(email):
    r = requests.get(f"https://api.hunter.io/v2/email-verifier?email={email}&api_key={secret_key}")
    return r.json()


#print(find_name("Daniel", "Zhu"))
#print(find_email("patrick@stripe.com"))
#breakpoint()
