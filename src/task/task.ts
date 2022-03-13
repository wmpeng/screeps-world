enum TaskStatus {
    Waiting,
    Executing,
    Finished,
    Deprecated,
}

enum TaskType {
    Build,
    Upgrade,
    Harvest,
}

// class Task {
//     type: TaskType;
//     otherArgs: any;
//     status: TaskStatus;
//     dependencies: Array<Task>;
// }

// type Priority = number;

// class HarvestTask implements Task {
//     priority: Priority;
//     name: string;
//     source: Source;
//     target: STRUCTURE_SPAWN | STRUCTURE_EXTENSION;
//     execute: () => boolean;
// }