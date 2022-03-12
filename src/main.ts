import { errorMapper } from './module/errorMapper'
import { roleHarvester } from './role/harvester'
import { roleBuilder } from './role/builder'
import { sayHello } from "./module/utils"
import { Priority } from './task/task'

console.log("begin")
// for (let priority in Priority) {
//     console.log(priority)
// }

// Object.entries(Priority).forEach(([key, value]) => {
//     console.log(key, value)
// });

//keys
Object.keys(Priority).forEach(key => {
    console.log(key);
});

// //values
// Object.values(Priority).forEach(value => {
//     console.log(value);
// });

// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1', { memory: { role: 'harvester' } }  );
// Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } } );
export const loop = errorMapper(() => {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder(creep);
        }
    }
})
