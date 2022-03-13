import { errorMapper } from './module/errorMapper'
import { roleHarvester } from './role/harvester'
import { roleBuilder } from './role/builder'
import { sayHello } from "./module/utils"
import { Priority } from './task_archive/task'
import { extend } from 'lodash'
import { HarvesterApi, HarvesterStructure } from "./executor/Harvester"
import { ExecutorApi, ExecutorStructure, ExecutorType } from './executor/executor'
import { MyMemory, MyMemoryApi } from './memory/memory'
import { SpawnerApi, SpawnerStructure } from './executor/spawner'

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


var spawn = Object.values(Game.spawns)[0];
// 新增一个Spawner
MyMemoryApi.push_executors(new SpawnerStructure(Object.values(Game.spawns)[0], "spawner_1"));
// 生产一个Harvester
SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1") as SpawnerStructure, ExecutorType.Harvester, "harvester_1");
// Harvester采矿
HarvesterApi.begin(MyMemoryApi.get_executor_by_name("harvester_1") as HarvesterStructure, Object.values(Game.spawns)[0]);
// 生产一个Upgrader
SpawnerApi.begin(MyMemoryApi.get_executor_by_name("spawner_1") as SpawnerStructure, ExecutorType.Upgrader, "upgrader_1");



// console.log("begin 10")
// console.log("myMemory", JSON.stringify(myMemory))
export const loop = errorMapper(() => {
    // console.log("begin 20")
    console.log("myMemory.executors.length", MyMemoryApi.get_executors().length)
    for (var executor of MyMemoryApi.get_executors()) {
        ExecutorApi.run(executor)
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
global.HarvesterExecutorStructure = HarvesterStructure
global.HarvesterExecutorApi = HarvesterApi
global.ExecutorStructure = ExecutorStructure
Game.getObjectById