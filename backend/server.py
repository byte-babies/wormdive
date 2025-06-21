from fastapi import FastAPI

import tools.huntertool as huntertool
import tools.ghunttool as ghunttool

app = FastAPI()

@app.get("/")
def root():
	return {"Hello" : "World"}


@app.post("/graph")
def graph(email = None, user = None, firstname = None, lastname = None, depth=0):
    tempgraphlist = []
    # run all functions
    if email:
        # go through all the email functions
        for i in hunter_email(email):
            if !(i in graph_list):
                graph_list.append(i)
        for i in ghunt_email(email):
            if !(i in graph_list):
                graph_list.append(i)
    if (user):
        # go through all the user functions
    if (firstname):
        for i in hunter_name(firstname, lastname):
            if !(i in graph_list):
                graph_list.append(i)
    # send to neo4j
    
    return 200

# Specific functions
def hunter_email(email = None,) -> list:
    if (email):
        return huntertool.find_email(email)
    return None

def hunter_name(firstname = None, lastname = None) -> list:
    if (firstname and lastname):
        return huntertool.find_name(firstname, lastname)
    return None

def ghunt_email(email = None) -> list:
    if (email):
        return ghunttool.find_email(email)
