console.log("Good luck today!")

interface ITask {
    id: number,
    chore: string,
    time: string,
}

type taskStatus = "waiting" | "doing" | "done";

const tasklist: ITask[] = [
    {
        id: 1,
        chore: "Städa köket",
        time: "40"
    },
    {
        id: 2,
        chore: "Diska",
        time: "50"
    }
]
console.log("hej")

// Variables

const wrapper = document.querySelector(".wrapper");
const form = document.querySelector(".form-section") as HTMLFormElement;
const taskInput = document.querySelector("#chore-input") as HTMLInputElement;
const timeInput = document.querySelector("#time-input") as HTMLInputElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;

let taskStatus = "waiting";
console.log(taskStatus);

tasklist.forEach((task) => {
    const container = document.createElement("article");
    const item = document.createElement("span");
    const time = document.createElement("span");
    const doingBtn = document.createElement("button") as HTMLButtonElement;
    const doneBtn = document.createElement("button") as HTMLButtonElement;

    container.classList.add("task-container");
    item.classList.add("task-item");
    time.classList.add("task-time");
    doingBtn.classList.add("doing-btn");
    doneBtn.classList.add("done-btn");

    item.textContent = task.chore;
    time.textContent = task.time;


    container.append(item, time, doingBtn, doneBtn);


    if (wrapper) {
        wrapper.appendChild(container);
    }

})

