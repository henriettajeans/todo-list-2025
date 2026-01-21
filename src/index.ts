console.log("Good luck today!")

interface ITask {
    id: number,
    chore: string,
    time: string,
    status: taskStatus
}

type taskStatus = "waiting" | "doing" | "done";

const tasklist: ITask[] = [
]

// If there is data in local storage, get it
const loadFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const parsedTasks: ITask[] = JSON.parse(savedTasks) as ITask[];
        tasklist.push(...parsedTasks);

        renderTasks();
    }
}


// Variables

const wrapper = document.querySelector(".list");
const form = document.querySelector(".form-section") as HTMLFormElement;
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const timeInput = document.querySelector("#time-input") as HTMLSelectElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;

let taskStatus = "waiting";


function clickEventOnContainer() {

    if (wrapper) {
        wrapper.addEventListener("click", (event) => {

            const target = event.target as HTMLElement;
            const container = target.closest(".task-container") as HTMLElement;
            if (!container) return;

            console.log("Du har klickat i: ", target);
            console.log("som tur var så hittade closest: ", container)
        })
    }
}

// function createTaskElement(task: ITask): HTMLElement {



//     return container;
// }

clickEventOnContainer();


// Loop and render data in HTML
function renderTasks() {

    if (wrapper) {
        wrapper.replaceChildren();
    }
    tasklist.forEach((task) => {
        const { chore, time, status, id } = task;

        const container = document.createElement("article");
        const item = document.createElement("span");
        const timeSpan = document.createElement("span");


        container.classList.add("task-container");
        item.classList.add("task-item");
        timeSpan.classList.add("task-time");

        container.dataset.id = id.toString();

        item.textContent = chore;
        timeSpan.textContent = time;

        const toggleBtn = document.createElement("button") as HTMLButtonElement;

        toggleBtn.classList.add(("done-btn"));


        toggleBtn.textContent =
            status === "done" ? "Ångra" :
                status === "doing" ? "Klart!" :
                    "Jobba med sysslan nu";


        toggleBtn.addEventListener("click", () => {
            if (task.status === "waiting") {
                task.status = "doing";
            } else if (task.status === "doing") {
                task.status = "done";
            } else {
                task.status = "waiting";
            }

            localStorage.setItem("tasks", JSON.stringify(tasklist));
            renderTasks();
        });

        if (status === "doing") {
            item.classList.add("doing")
        };
        if (status === "done") {
            item.classList.add("check");
        }

        container.append(item, time, toggleBtn);

        if (wrapper) {
            wrapper.appendChild(container);

        }

    })

};

loadFromLocalStorage();


// Create a function and HTML elements to call if user wants to remove whole list (from local storage)
// deleteList();

// Form logic
form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!taskInput || !timeInput) return;

    const task = taskInput.value;
    const time = timeInput.value;

    const newTask: ITask = {
        id: Date.now(),
        chore: task,
        time: time,
        status: "waiting"
    }
    tasklist.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasklist));
    console.log(newTask);
    renderTasks();
    form.reset();
})
// console.log(form, taskInput, timeInput);