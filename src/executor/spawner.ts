import { MyMemory, MyMemoryApi } from "@/memory/memory";
import { BaseExecutorApi, BaseExecutorStructure, ExecutorType } from "./base_executor";
import { HarvesterStructure } from "./Harvester";
import { UpgraderStructure } from "./upgrader";

export class SpawnerStructure extends BaseExecutorStructure {
    spawnId: Id<StructureSpawn>;

    newExecutorType: ExecutorType;

    newExecutorName: string;

    waiting_id: boolean = false;

    constructor(spawn: StructureSpawn, name: string) {
        super(ExecutorType.Spawner, name)
        this.spawnId = spawn.id
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class SpawnerApi extends BaseExecutorApi {
    public static executorBodyDict: { [key in ExecutorType]?: Array<BodyPartConstant> } = {
        [ExecutorType.Harvester]: [WORK, CARRY, MOVE],
        [ExecutorType.Upgrader]: [WORK, CARRY, MOVE],
        [ExecutorType.Builder]: [WORK, CARRY, MOVE],
    };

    static begin(spawner: SpawnerStructure, newExecutorType: ExecutorType, newExecutorName: string) {
        spawner.newExecutorType = newExecutorType;
        spawner.newExecutorName = newExecutorName;
        super._begin(spawner);
    }

    static stop(spawner: SpawnerStructure) {
        super._stop(spawner);
    }
    spawner
    static run(spawner: SpawnerStructure): void {
        console.log("[SpawnerApi] run()");

        if (spawner.waiting_id == false) {
            var spawn = Game.getObjectById(spawner.spawnId);

            var errCode: ScreepsReturnCode = spawn.spawnCreep(this.executorBodyDict[spawner.newExecutorType], spawner.newExecutorName);
            if (errCode != OK) {
                console.log("[SpawnerApi] errCode:", errCode);
                return;
            }

            spawner.waiting_id = true;
        } else if (!Game.creeps[spawner.newExecutorName].id) {
            return;
        } else {
            var newCreep = Game.creeps[spawner.newExecutorName];
            console.log("[SpawnerApi] new creep:", JSON.stringify(newCreep))
            console.log("[SpawnerApi] Game.creeps:", JSON.stringify(Game.creeps))

            // TODO 优化
            if (spawner.newExecutorType == ExecutorType.Harvester) {
                MyMemoryApi.push_executors(new HarvesterStructure(newCreep, spawner.newExecutorName));
            } else if (spawner.newExecutorType == ExecutorType.Upgrader) {
                MyMemoryApi.push_executors(new UpgraderStructure(newCreep, spawner.newExecutorName))
            }

            spawner.waiting_id = false;
            super._finished(spawner)
        }
    }
}
