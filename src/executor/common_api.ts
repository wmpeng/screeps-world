import { ExecutorStatus, BaseExecutorStructure, ExecutorType } from "./base_executor";
import { HarvesterApi, HarvesterStructure } from "./harvester";
import { SpawnerApi, SpawnerStructure } from "./spawner";
import { UpgraderApi, UpgraderStructure } from "./upgrader";

export class ExecutorCommonApi {
    static run(executor: BaseExecutorStructure): void {
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