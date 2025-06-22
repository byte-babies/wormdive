from fastapi import FastAPI

import tools.huntertool as huntertool
import tools.ghunttool as ghunttool

app = FastAPI()

@app.get("/")
def root():
	return {"Hello" : "World"}

# Specific functions
@app.get("/hunter_email")
def hunter_email(email = None,) -> list:
    if (email):
        return huntertool.find_email(email)
    return None

@app.get("/hunter_name")
def hunter_name(firstname = None, lastname = None) -> list:
    if (firstname and lastname):
        return huntertool.find_name(firstname, lastname)
    return None

@app.get("/ghunt_email")
def ghunt_email(email = None) -> list:
    if (email):
        return ghunttool.find_email(email)
