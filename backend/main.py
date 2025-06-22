from fastapi import FastAPI
from routers import username 

app = FastAPI()

@app.get("/")
def root():
	return {"Hello" : "World"}

app.include_router(username.router)
