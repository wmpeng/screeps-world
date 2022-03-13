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


export class ExecutorStructure {
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

export class ExecutorApi {
    protected static _begin(executor: ExecutorStructure): void {  // 开始，状态从
        executor.status = ExecutorStatus.Busy;
    }

    protected static _stop(executor: ExecutorStructure): void {  // 外部打断执行
        executor.status = ExecutorStatus.Idle;
    }

    protected static _finished(executor: ExecutorStructure): void {  // 当前任务执行完成
        executor.status = ExecutorStatus.Idle;
    }

    static run(executor: ExecutorStructure): void {
        console.log("ExecutorApi.run()");

        if (executor.status == ExecutorStatus.Idle) {
            return
        }

        // TODO 优化
        if (executor.type == ExecutorType.Harvester) {
            HarvesterApi.run(executor as HarvesterStructure)
        } else if (executor.type == ExecutorType.Upgrader) {
            UpgraderApi.run(executor as UpgraderStructure)
        } else if (executor.type == ExecutorType.Spawner) {
            SpawnerApi.run(executor as SpawnerStructure)
        }
    }
}


// export { ExecutorStatus, ExecutorType, ExecutorStructure, ExecutorApi };