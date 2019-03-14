const PIXI = require('pixi.js')

class Collision {

  constructor(options) {
    STORAGE.collisionClass = this
    console.log("collision options", options)
    this.setup()
  }

  setup() {
  }

  bind() {
    let that = this
  }

  gameLoop(delta){
  }

  play(delta) {

  }

 
}

export default Collision
