from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

counter = 0 #global counter to create an ID Number

app = FastAPI()

class Task(BaseModel):
    title: str
    description: str | None = None
    complete: bool = False

tasks = []

@app.get("/tasks")
def list():
    return tasks

@app.post("/tasks", status_code=201)
async def create(task: Task):
    global counter
    counter += 1
    task_dict = task.model_dump()
    task_dict["id"] = counter
    tasks.append(task_dict)
    return task_dict

@app.put("/tasks/{id}")
async def edit(task: Task, id: int):
    for t in tasks:
        if t["id"] == id:
            task_dict = task.model_dump()
            t.update(task_dict)
            return t

    raise HTTPException(status_code=404, detail="ERROR! Task not found ...")

@app.delete("/tasks/{id}", status_code=204)
async def delete(id: int):
    for task in tasks:
        if task["id"] == id:
            tasks.remove(task)
            return

    raise HTTPException(status_code=404, detail="ERROR! Task not found ...")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)