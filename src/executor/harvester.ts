import { BaseExecutorApi, ExecutorStatus, BaseExecutorStructure, ExecutorType } from "./base_executor";

export class HarvesterStructure extends BaseExecutorStructure {
    creepId: Id<Creep>;

    targetId: Id<AnyStoreStructure>;

    constructor(creep: Creep, name: string) {
        super(ExecutorType.Harvester, name)
        this.creepId = creep.id
    }
}

export class HarvesterApi extends BaseExecutorApi {
    static begin(executor: HarvesterStructure, target: AnyStoreStructure) {
        executor.targetId = target.id
        super._begin(executor)
    }

    static stop(executor: HarvesterStructure) {
        super._stop(executor)
    }

    static run(executor: HarvesterStructure): void {
        console.log("HarvesterApi.run()");

        var creep: Creep = Game.getObjectById(executor.creepId)
        var target: AnyStoreStructure = Game.getObjectById(executor.targetId)

        if (creep.store.getFreeCapacity() > 0) {  // 移动并采矿
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {  // 移动并传输能量
            if (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }

}

// export { HarvesterExecutorStructure, HarvesterExecutorApi };