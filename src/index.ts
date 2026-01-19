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

// Variables

const wrapper = document.querySelector(".list");
const form = document.querySelector(".form-section") as HTMLFormElement;
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const timeInput = document.querySelector("#time-input") as HTMLSelectElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;

let taskStatus = "waiting";
console.log(taskStatus);

function renderTasks() {
    if (wrapper) {
        wrapper.replaceChildren();
    }
    tasklist.forEach(({ chore, time }) => {
        const container = document.createElement("article");
        const item = document.createElement("span");
        const timeSpan = document.createElement("span");


        container.classList.add("task-container");
        item.classList.add("task-item");
        timeSpan.classList.add("task-time");


        item.textContent = chore;
        timeSpan.textContent = time;


        const doingBtn = document.createElement("button") as HTMLButtonElement;
        const doneBtn = document.createElement("button") as HTMLButtonElement;

        doingBtn.classList.add("doing-btn");
        doneBtn.classList.add(("done-btn"));

        doingBtn.textContent = "Jobbar med";
        doneBtn.textContent = "Klart";

        container.append(item, time, doingBtn, doneBtn);

        if (wrapper) {
            wrapper.appendChild(container);

            doingBtn.addEventListener("click", () => {

                let taskStatus = "doing";

                console.log("Jobbar med", chore), taskStatus;
                item.classList.add("doing")
            })

            doneBtn.addEventListener("click", () => {
                let taskStatus = "done";
                console.log("Du är klar med", chore, taskStatus);

                item.classList.add("check");

                // Removing the buttons from HTML, could be changed for a redo button
                doneBtn.remove();
                doingBtn.remove();

            })
        }

    })

}
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    const parsedTasks: ITask[] = JSON.parse(savedTasks);
    tasklist.push(...parsedTasks);
}
renderTasks();

// Form logic
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!taskInput || !timeInput) return;

    const task = taskInput.value;
    const time = timeInput.value;
    console.log("!")

    const newTask: ITask = {
        id: Date.now(),
        chore: task,
        time: time
    }
    tasklist.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasklist));
    console.log(newTask);
    renderTasks();
    form.reset();
    // localStorage.setItem(newTask);
})
console.log(form, taskInput, timeInput);