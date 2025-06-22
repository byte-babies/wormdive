from fastapi import FastAPI
from routers import username 
from generators.naminter import naminter, shutdown_naminter

app = FastAPI()
app.include_router(username.router)

@app.on_event("startup")
async def startup():
    # Initialize Naminter on startup
    await naminter.__aenter__()
    await naminter.fetch_remote_list()

@app.on_event("shutdown")
async def shutdown():
    # Clean up Naminter on shutdown
    await shutdown_naminter()
