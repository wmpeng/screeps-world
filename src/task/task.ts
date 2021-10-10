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
}

class MiningTask implements Task {
    priority: Priority;
    name: string;
    source: Source;
    target: STRUCTURE_SPAWN | STRUCTURE_EXTENSION;
}

class BuildingTask implements Task {
    priority: Priority;
    name: string;
    source: Source;
    target: ConstructionSite;
}

class DaemonTask implements Task {
    priority: Priority;
    name: string;
}