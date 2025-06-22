from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import username 
from generators.naminter import naminter, shutdown_naminter

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
