export enum Priority {
    High,
    Medium,
    Low,
}

interface MyBaseInterface {
    name: string;
}

export interface Task extends MyBaseInterface {
    priority: Priority;
    execute: () => boolean;
}

class MiningTask implements Task {
    priority: Priority;
    name: string;
    source: Source;
    target: STRUCTURE_SPAWN | STRUCTURE_EXTENSION;
    execute: () => boolean;
}

class BuildingTask implements Task {
    priority: Priority;
    name: string;
    source: Source;
    target: ConstructionSite;
    execute: () => boolean;
}

class DaemonTask implements Task {
    priority: Priority;
    name: string;
    execute: () => boolean;
}