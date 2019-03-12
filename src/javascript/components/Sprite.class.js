const PIXI = require('pixi.js')
console.log(PIXI)

class Sprite {

  constructor(options) {
    STORAGE.spriteClass = this
    STORAGE.state
    STORAGE.loader = new PIXI.Loader()
    STORAGE.loader.add("assets/sprites/sprites.json").load(this.setup)

    // directions
    this.left = STORAGE.spriteClass.keyboard("ArrowLeft")
    this.up = STORAGE.spriteClass.keyboard("ArrowUp")
    this.right = STORAGE.spriteClass.keyboard("ArrowRight")
    this.down = STORAGE.spriteClass.keyboard("ArrowDown")
  }

  setup() {
    let sheet = STORAGE.loader.resources["assets/sprites/sprites.json"].spritesheet
    STORAGE.female = new PIXI.Sprite(sheet.textures["land0.png"])
    STORAGE.female.vx = 0
    STORAGE.female.vy = 0

    // sprites animation
    STORAGE.animatedFemale = new PIXI.AnimatedSprite(sheet.animations["land"])
    STORAGE.animatedFemale.play()
    STORAGE.app.stage.addChild(STORAGE.animatedFemale)

    // bind
    STORAGE.spriteClass.bind()

    // animation frame
    STORAGE.spriteClass.state = STORAGE.spriteClass.play
    STORAGE.app.ticker.add(delta => STORAGE.spriteClass.gameLoop(delta))
  }

  bind() {
    let that = this

    this.left.press = function(mouseData) {
      STORAGE.female.vx = -2
      STORAGE.female.vy = 0
    }
    this.left.release = function(mouseData) {
      if (!that.right.isDown && STORAGE.female.vy === 0) {
        STORAGE.female.vx = 0
      }
    }

    this.up.press = function(mouseData) {
      STORAGE.female.vy = -2
      STORAGE.female.vx = 0
    }
    this.up.release = function(mouseData) {
      if (!that.down.isDown && STORAGE.female.vx === 0) {
        STORAGE.female.vy = 0
      }
    }

    this.right.press = function(mouseData) {
      STORAGE.female.vx = 2
      STORAGE.female.vy = 0
    }
    this.right.release = function(mouseData) {
      if (!that.left.isDown && STORAGE.female.vy === 0) {
        STORAGE.female.vx = 0
      }
    }

    this.down.press = function(mouseData) {
      STORAGE.female.vy = 2
      STORAGE.female.vx = 0
    }
    this.down.release = function(mouseData) {
      if (!that.up.isDown && STORAGE.female.vx === 0) {
        STORAGE.female.vy = 0
      }
    }
  }

  gameLoop(delta){
    STORAGE.spriteClass.state(delta)
  }

  play(delta) {
    STORAGE.animatedFemale.x += STORAGE.female.vx
    STORAGE.animatedFemale.y += STORAGE.female.vy
  }

  keyboard(value) {
    let key = {}
    key.value = value
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
        event.preventDefault()
      }
    }

    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
        event.preventDefault()
      }
    }

    const downListener = key.downHandler.bind(key)
    const upListener = key.upHandler.bind(key)
    
    window.addEventListener(
      "keydown", downListener, false
    )
    window.addEventListener(
      "keyup", upListener, false
    )
    
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener)
      window.removeEventListener("keyup", upListener)
    }
    
    return key
  }
}

export default Sprite
