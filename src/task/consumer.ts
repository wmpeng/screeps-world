import { Task } from "./task";
import { TaskQueue } from "./task-queue";

class TaskConsumer {
    private taskQueue: TaskQueue;

    consumeOne() {
        const task: Task = this.taskQueue.pop();

        const result: boolean = task.execute();

        if (!result) {
            console.log("task execute failed", task);
            this.taskQueue.push_front(task);
        }
    }

    begin() {

    }
}