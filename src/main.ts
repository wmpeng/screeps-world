import { errorMapper } from './module/errorMapper'
import { HarvesterApi, HarvesterStructure } from "./executor/Harvester"
import { BaseExecutorStructure, ExecutorType } from './executor/base_executor'
import { MyMemoryApi } from './memory/memory'
import { ExecutorCommonApi } from './executor/common_api'
import { SpawnerApi, SpawnerStructure } from './executor/spawner'
import { UpgraderApi, UpgraderStructure } from './executor/upgrader'

// console.log("begin")
// for (let priority in Priority) {
//     console.log(priority)
// }

// Object.entries(Priority).forEach(([key, value]) => {
//     console.log(key, value)
// });

//keys
// Object.keys(Priority).forEach(key => {
//     console.log(key);
// });

// //values
// Object.values(Priority).forEach(value => {
//     console.log(value);
// });

// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester' } }  );
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );


// var spawn = Object.values(Game.spawns)[0];
// // 新增一个Spawner
// MyMemoryApi.push_executors(new SpawnerStructure(Object.values(Game.spawns)[0], "spawner_1"));
// // 生产一个Harvester
// SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1") as SpawnerStructure, ExecutorType.Harvester, "harvester_1");
// SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1"), ExecutorType.Harvester, "harvester_1");
// // Harvester采矿
// HarvesterApi.begin(MyMemoryApi.get_executor_by_name("harvester_1") as HarvesterStructure, Object.values(Game.spawns)[0]);
// HarvesterApi.begin(MyMemoryApi.get_executor_by_name("harvester_1"), Object.values(Game.spawns)[0]);
// // 生产一个Upgrader
// SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1") as SpawnerStructure, ExecutorType.Upgrader, "upgrader_1");
// SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1"), ExecutorType.Upgrader, "upgrader_1");
// // Upgrader去工作
// UpgraderApi.begin(MyMemoryApi.get_executor_by_name("upgrader_1") as UpgraderStructure)
// UpgraderApi.begin(MyMemoryApi.get_executor_by_name("upgrader_1"))


console.log("1647180060812")
// console.log("begin 10")
// console.log("myMemory", JSON.stringify(myMemory))
export const loop = errorMapper(() => {
    // console.log("begin 20")
    console.log("myMemory.executors.length", MyMemoryApi.get_executors().length)
    for (var executor of MyMemoryApi.get_executors()) {
        ExecutorCommonApi.run(executor)
        //     // console.log("executor.run", executor.run)
        //     // console.log("executor", JSON.stringify(executor))
        //     // executor.run();
    }

    // Memory.rooms.executorss = new Array<Executor>();

    // for (var name in Game.creeps) {
    //     var creep = Game.creeps[name];
    //     if (creep.memory.role == 'harvester') {
    //         roleHarvester(creep);
    //     }
    //     if (creep.memory.role == 'builder') {
    //         roleBuilder(creep);
    //     }
    // }
})

// var x = new HarvesterExecutor(new Creep(undefined))
global.BaseExecutorStructure = BaseExecutorStructure
global.HarvesterStructure = HarvesterStructure
global.SpawnerStructure = SpawnerStructure
global.MyMemoryApi = MyMemoryApi
global.SpawnerApi = SpawnerApi
global.UpgraderApi = UpgraderApi
global.HarvesterApi = HarvesterApi
global.ExecutorType = ExecutorType
