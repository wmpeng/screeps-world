import { MyMemory, MyMemoryApi } from "@/memory/memory";
import { ExecutorApi, ExecutorStructure, ExecutorType } from "./executor";
import { HarvesterStructure } from "./Harvester";
import { UpgraderStructure } from "./upgrader";

export class SpawnerStructure extends ExecutorStructure {
    spawnId: Id<StructureSpawn>;

    newExecutorType: ExecutorType;

    newExecutorName: string;

    constructor(spawn: StructureSpawn, name: string) {
        super(ExecutorType.Spawner, name)
        this.spawnId = spawn.id
    }
}

export class SpawnerApi extends ExecutorApi {
    public static executorBodyDict: { [key in ExecutorType]?: Array<BodyPartConstant> } = {
        [ExecutorType.Harvester]: [WORK, CARRY, MOVE],
        [ExecutorType.Upgrader]: [WORK, CARRY, MOVE],
        [ExecutorType.Builder]: [WORK, CARRY, MOVE],
    };

    static begin(executor: SpawnerStructure, newExecutorType: ExecutorType, newExecutorName: string) {
        executor.newExecutorType = newExecutorType;
        executor.newExecutorName = newExecutorName;
        super._begin(executor);
    }

    static stop(executor: SpawnerStructure) {
        super._stop(executor);
    }

    static run(executor: SpawnerStructure): void {
        console.log("[SpawnerApi] run()");

        var spawn = Game.getObjectById(executor.spawnId);

        var errCode: ScreepsReturnCode = spawn.spawnCreep(this.executorBodyDict[executor.newExecutorType], executor.name);
        if (errCode != OK) {
            console.log("[SpawnerApi] errCode:", errCode);
            return;
        }

        var creep = Game.creeps[-1];

        // TODO 优化
        if (executor.newExecutorType == ExecutorType.Harvester) {
            MyMemoryApi.push_executors(new HarvesterStructure(creep, executor.newExecutorName));
        } else if (executor.newExecutorType == ExecutorType.Upgrader) {
            MyMemoryApi.push_executors(new UpgraderStructure(creep, executor.newExecutorName))
        }

        super._finished(executor)

    }
}

SpawnerApi.executorBodyDict[ExecutorType.Builder] = []