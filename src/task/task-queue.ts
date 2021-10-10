import { Priority, Task } from "./task";

interface IMyQueue<T> {
    push(item: T);

    front(): T | undefined;

    pop(): T | undefined;
}

class MyQueue<T> implements IMyQueue<T> {
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
}

export class TaskQueue implements IMyQueue<Task> {
    private data: Map<Priority, MyQueue<Task>> = new Map();

    push(task: Task) {
        this.data.get(task.priority).push(task);
    }

    front(): Task | undefined {
        return this.data.get(Priority.High)?.front() || this.data.get(Priority.Medium)?.front() || this.data.get(Priority.Low)?.front()
    }

    pop(): Task | undefined {
        return this.data.get(Priority.High)?.pop() || this.data.get(Priority.Medium)?.pop() || this.data.get(Priority.Low)?.pop()
    }
}
