import { BaseExecutorApi, BaseExecutorStructure, ExecutorType } from "./base_executor";

export class UpgraderStructure extends BaseExecutorStructure {
    creepId: Id<Creep>;

    constructor(creep: Creep, name: string) {
        super(ExecutorType.Upgrader, name)
        this.creepId = creep.id
    }
}

export class UpgraderApi extends BaseExecutorApi {
    static begin(executor: UpgraderStructure) {
        super._begin(executor)
    }

    static stop(executor: UpgraderStructure) {
        super._stop(executor)
    }

    static run(executor: UpgraderStructure): void {
        console.log("UpgraderApi.run()");

        var creep: Creep = Game.getObjectById(executor.creepId)

        if (creep.store[RESOURCE_ENERGY] == 0) {  // 移动并采矿
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else {  // 移动并升级
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}