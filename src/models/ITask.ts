export interface ITask {
    id: number,
    chore: string,
    time: string,
    status: taskStatus
}

// Type is exported in interface above
type taskStatus = "waiting" | "doing" | "done";