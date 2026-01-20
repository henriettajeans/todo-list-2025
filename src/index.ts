console.log("Good luck today!")

interface ITask {
    id: number,
    chore: string,
    time: string,
    status: taskStatus
}

type taskStatus = "waiting" | "doing" | "done";

const tasklist: ITask[] = [
    // {
    //     id: 1,
    //     chore: "Städa köket",
    //     time: "40"
    // },
    // {
    //     id: 2,
    //     chore: "Diska",
    //     time: "50"
    // }
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
console.log(taskStatus);

if (wrapper) {
    wrapper.addEventListener("click", (event) => {

        const target = event.target as HTMLElement;
        const container = target.closest(".task-container") as HTMLElement;
        if (!container) return;

        console.log("Du har klickat i: ", target);
        console.log("som tur var så hittade closest: ", container)
    })



}

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

        // Set types for classes here but it did not work
        // if (taskStatus === "doing") {
        //     item.classList.add("doing");
        // } else if (taskStatus === "done") {
        //     item.classList.add("check");
        // }

        const doingBtn = document.createElement("button") as HTMLButtonElement;
        const doneBtn = document.createElement("button") as HTMLButtonElement;

        doingBtn.classList.add("doing-btn");
        doneBtn.classList.add(("done-btn"));

        doingBtn.textContent = "Jobbar med";
        doneBtn.textContent = "Klart";

        if (status === "doing") {
            item.classList.add("doing")
            // doingBtn.remove();
        };
        if (status === "done") {
            item.classList.add("check");
            // doingBtn.remove();
            // doneBtn.remove();
        }

        container.append(item, time, doingBtn, doneBtn);

        if (wrapper) {
            wrapper.appendChild(container);

            // Add validation to check if taskstatus is waiting or done befor rendering buttons
            doingBtn.addEventListener("click", () => {

                task.status = "doing";

                console.log("Jobbar med", chore), taskStatus;
                item.classList.add("doing")
            })

            doneBtn.addEventListener("click", () => {
                item.classList.add("check");
                task.status = "done";
                if (task.status === "done")
                    doneBtn.textContent = "Ändra tillbaka";
                localStorage.setItem("tasks", JSON.stringify(tasklist));
                console.log("Du är klar med", chore, taskStatus);


                // Removing the buttons from HTML, could be changed for a redo button
                doneBtn.remove();
                doingBtn.remove();
                localStorage.setItem("tasks", JSON.stringify(tasklist));
                console.log(taskStatus)

            })
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
    console.log("!")

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