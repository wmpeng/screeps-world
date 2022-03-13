import { BaseExecutorStructure } from "./../executor/base_executor";

export class MyMemory implements Memory {
    creeps: { [name: string]: CreepMemory };
    powerCreeps: { [name: string]: PowerCreepMemory };
    flags: { [name: string]: FlagMemory };
    rooms: { [name: string]: RoomMemory };
    spawns: { [name: string]: SpawnMemory };
    executors: Array<BaseExecutorStructure>;
}

export class MyMemoryApi {
    static getMyMemory(): MyMemory {
        return Memory as MyMemory
    }

    static _init_executors(): void {
        if (!("executors" in this.getMyMemory())) {
            this.getMyMemory().executors = new Array<BaseExecutorStructure>();
        }
    }

    static push_executors(executor: BaseExecutorStructure): void {
        this._init_executors();
        this.getMyMemory().executors.push(executor)
    }

    static get_executors(): Array<BaseExecutorStructure> {
        this._init_executors();
        return this.getMyMemory().executors
    }

    static get_executor_by_name(name: string): BaseExecutorStructure | void {
        for (var executor of this.get_executors()) {
            if (executor.name == name) {
                return executor
            }
        }

        return null
    }
}