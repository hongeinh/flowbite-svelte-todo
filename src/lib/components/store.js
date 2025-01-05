import { writable, readable } from "svelte/store";
let name = readable("Hong Anh");
let priorities = writable([
    { name: "Low", color: "green", count: 0},
    { name: "Medium", color: "yellow", count: 0},
    { name: "Urgent", color: "red", count: 0},
])

let statuses = ["In progress", "Finish"]

let totalTasks = writable(0);
let todoTasks = writable([
    {
        name: "Finish Todo App",
        priority: "Medium",
        deadline: "15/01/2025",
        status: "In progress"
    },
    {
        name: "BIT Project",
        priority: "Medium",
        deadline: "15/01/2025",
        status: "In progress"
    },
])

export {name, priorities, totalTasks, todoTasks};