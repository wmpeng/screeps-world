import { Priority, Task } from "./task";

interface MyQueue<T> {
    push(item: T);

    front(): T | undefined;

    pop(): T | undefined;

    pushFront(item: T);
}

class SimpleQueue<T> implements MyQueue<T> {
    private data: Array<T> = new Array();

    push(item: T) {
        this.data.push(item);
    }

    front(): T | undefined {
        return this.data[0]
    }

    pop(): T | undefined {
        return this.data.shift();
    }

    pushFront(item: T) {
        this.data.unshift(item);
    }
}

export class TaskQueue implements MyQueue<Task> {
    private data: Map<Priority, SimpleQueue<Task>> = new Map();

    push(task: Task) {
        this.data.get(task.priority).push(task);
    }

    front(): Task | undefined {
        return this.data.get(Priority.High)?.front() || this.data.get(Priority.Medium)?.front() || this.data.get(Priority.Low)?.front()
    }

    pop(): Task | undefined {
        return this.data.get(Priority.High)?.pop() || this.data.get(Priority.Medium)?.pop() || this.data.get(Priority.Low)?.pop()
    }

    pushFront(task: Task) {
        this.data.get(task.priority).pushFront(task);
    }
}
