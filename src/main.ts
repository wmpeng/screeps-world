import { errorMapper } from './module/errorMapper'
import { sayHello } from "./module/utils"

export const loop = errorMapper(() => {
    sayHello()
    var room = Game.rooms
})
