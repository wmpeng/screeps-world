# 注意

会有内存泄漏，死掉的creep的memory不清空。如果每次新生产creep记得从memory中清空creep记录：

```javascript
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
```

或者：
Apart from creating new creeps after the death of old ones, there is another way to maintain the needed number of creeps: the method StructureSpawn.renewCreep. Creep aging is disabled in the Tutorial, so we recommend that you familiarize yourself with it on your own.