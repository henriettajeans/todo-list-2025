import type { ITask } from "./models/ITask.ts";

console.log("Good luck today!")


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

// TODO: create new function removeSingleTaskFromLocalStorage, add a trash can icon
// next to each task to remove and update LS array

const removeAllFromLocalStorage = () => {
    let removeState = window.confirm("Du kommer ta bort alla sysslor.")
    if (removeState === true) {
        localStorage.clear();
        // Resetting tasklist to empty
        tasklist.length = 0;
        renderTasks();
    } else {
        console.log("Du avbröt och listan är kvar")
    }

}

// Variables

const wrapper = document.querySelector(".list");
const form = document.querySelector(".form-section") as HTMLFormElement;
const taskInput = document.querySelector("#task-input") as HTMLInputElement;
const timeInput = document.querySelector("#time-input") as HTMLSelectElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;


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

function hoverEventOnTask() {

    if (!wrapper) return;
    wrapper.addEventListener("mouseover", (event) => {
        const target = event.target as HTMLElement;
        const container = target.closest(".task-container") as HTMLElement;
        if (!container) return;
        const currentHover = document.querySelector(".task-container.hover")
        if (currentHover) {
            currentHover.classList.remove("hover");
        }
        container.classList.add("hover");
        console.log("hovrar")
    })
}

function createTaskElement(task: ITask): HTMLElement {

    const { chore, time, status, id } = task;

    const container = document.createElement("article");
    const item = document.createElement("span");
    const timeSpan = document.createElement("span");

    container.classList.add("task-container");
    item.classList.add("task-item");
    timeSpan.classList.add("task-time");

    container.dataset.id = id.toString();

    item.textContent = chore;
    timeSpan.innerHTML = `<i class="fa-solid fa-stopwatch"></i>` + time;

    const toggleBtn = document.createElement("button") as HTMLButtonElement;

    toggleBtn.classList.add(("done-btn"));


    toggleBtn.innerHTML =
        status === "done" ? `<i class="fa-solid fa-rotate-right"></i>` :
            status === "doing" ? `<i class="fa-solid fa-circle-check"></i>` :
                `<i class="fa-solid fa-circle-play fa-l"></i>`;


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

    container.append(item, timeSpan, toggleBtn);
    return container;
}

clickEventOnContainer();

hoverEventOnTask();

// Loop and render data in HTML
function renderTasks() {

    if (wrapper) {
        wrapper.replaceChildren();
        const listTitle = document.createElement("h2");
        listTitle.classList.add("listTitle");
        listTitle.textContent = "Planerade sysslor";


        wrapper.appendChild(listTitle);

        tasklist.forEach((task) => {
            const singleTask = createTaskElement(task);

            if (wrapper) {
                wrapper.appendChild(singleTask);
            }
        })

        // Adding a button to be able to clear array in local storage

        const removeAllTasksBtn = document.createElement("button");
        removeAllTasksBtn.classList.add("remove-all-btn");
        removeAllTasksBtn.textContent = "Ta bort allt";

        removeAllTasksBtn.addEventListener("click", () => {

            removeAllFromLocalStorage();
            renderTasks();

            // TODO: remove button and title after function is done
        })

        wrapper.appendChild(removeAllTasksBtn);
    }
};

loadFromLocalStorage();


// Form logic
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // If the input fields are empty- cancel this call
    if (!taskInput || !timeInput) return;

    const task = taskInput.value;
    const time = timeInput.value;

    const newTask: ITask = {
        id: Date.now(),
        chore: task,
        time: time,
        status: "waiting"
    }

    // If there was data in the input fields, add them to tasklist array and set them to local storage
    tasklist.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasklist));
    console.log(newTask);
    renderTasks();
    form.reset();
})