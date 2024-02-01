from fastapi import FastAPI
import uvicorn
app = FastAPI()


@app.get("/messages")
async def root():
    return "service not implemented"

if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='localhost')

