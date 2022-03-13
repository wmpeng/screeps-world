import { ExecutorStructure } from "@/executor/executor";

export class MyMemory implements Memory {
    creeps: { [name: string]: CreepMemory };
    powerCreeps: { [name: string]: PowerCreepMemory };
    flags: { [name: string]: FlagMemory };
    rooms: { [name: string]: RoomMemory };
    spawns: { [name: string]: SpawnMemory };
    executors: Array<ExecutorStructure>;
}

export class MyMemoryApi {
    private static readonly myMemory = Memory as MyMemory;

    static _init_executors(): void {
        if (!("executors" in this.myMemory)) {
            this.myMemory.executors = new Array<ExecutorStructure>();
        }
    }

    static push_executors(executor: ExecutorStructure): void {
        this._init_executors();
        this.myMemory.executors.push(executor)
    }

    static get_executors(): Array<ExecutorStructure> {
        this._init_executors();
        return this.myMemory.executors
    }

    static get_executor_by_name(name: string): ExecutorStructure | void {
        for (var executor of this.get_executors()) {
            if (executor.name == name) {
                return executor
            }
        }

        return null
    }
}