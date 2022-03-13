import { HarvesterApi, HarvesterStructure } from "./Harvester";
import { SpawnerApi, SpawnerStructure } from "./spawner";
import { UpgraderApi, UpgraderStructure } from "./upgrader";

export enum ExecutorStatus {
    // New,  // 新begin之后
    // Waiting,  // 等待某个资源
    Busy,  // 运行中
    Idle,  // 闲置
}

export enum ExecutorType {
    Harvester,
    Upgrader,
    Builder,
    Spawner,
}


export class BaseExecutorStructure {
    name: string;

    type: ExecutorType;

    status: ExecutorStatus;

    // readonly executor: Creep | StructureSpawn;

    constructor(type: ExecutorType, name: string, /*, executor: Creep | StructureSpawn*/) {
        this.status = ExecutorStatus.Idle;
        this.type = type;
        this.name = name;
        // this.executor = executor
    }
}

export class BaseExecutorApi {
    protected static _begin(executor: BaseExecutorStructure): void {  // 开始，状态从
        executor.status = ExecutorStatus.Busy;
    }

    protected static _stop(executor: BaseExecutorStructure): void {  // 外部打断执行
        executor.status = ExecutorStatus.Idle;
    }

    protected static _finished(executor: BaseExecutorStructure): void {  // 当前任务执行完成
        executor.status = ExecutorStatus.Idle;
    }
}


// export { ExecutorStatus, ExecutorType, ExecutorStructure, ExecutorApi };