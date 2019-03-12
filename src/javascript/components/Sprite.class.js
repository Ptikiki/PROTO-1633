const PIXI = require('pixi.js')

class Sprite {

  constructor(options) {
    STORAGE.spriteClass = this
    STORAGE.state
    STORAGE.loader = new PIXI.Loader()
    STORAGE.loader.add("assets/sprites/atlas.json").load(this.setup)

    // directions
    this.left = STORAGE.spriteClass.keyboard("ArrowLeft")
    this.up = STORAGE.spriteClass.keyboard("ArrowUp")
    this.right = STORAGE.spriteClass.keyboard("ArrowRight")
    this.down = STORAGE.spriteClass.keyboard("ArrowDown")
  }

  setup() {
    STORAGE.sheet = STORAGE.loader.resources["assets/sprites/atlas.json"].spritesheet
    console.log("sheet", STORAGE.sheet)
    STORAGE.female = new PIXI.Sprite(STORAGE.sheet.textures["elle-1/land0.png"])
    STORAGE.female.vx = 0
    STORAGE.female.vy = 0

    // sprites animation
    STORAGE.animatedFemale = new PIXI.AnimatedSprite(STORAGE.sheet.animations["elle-0/land"])
    console.log("ici", STORAGE.animatedFemale)
    STORAGE.animatedFemale.animationSpeed = 0.5
    STORAGE.animatedFemale.transform.position._x = 400
    STORAGE.animatedFemale.transform.position._y = 400
    STORAGE.animatedFemale.transform.scale._x = 6
    STORAGE.animatedFemale.transform.scale._y = 6
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
      STORAGE.female.vx = -5
      STORAGE.female.vy = 0
      STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-0/land"]
    }
    this.left.release = function(mouseData) {
      if (!that.right.isDown && STORAGE.female.vy === 0) {
        STORAGE.female.vx = 0
        STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
      }
    }

    this.up.press = function(mouseData) {
      STORAGE.female.vy = -5
      STORAGE.female.vx = 0
      STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-0/qte-jump"]
    }
    this.up.release = function(mouseData) {
      if (!that.down.isDown && STORAGE.female.vx === 0) {
        STORAGE.female.vy = 0
        STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
      }
    }

    this.right.press = function(mouseData) {
      STORAGE.female.vx = 5
      STORAGE.female.vy = 0
      STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-menu/waiting"]
    }
    this.right.release = function(mouseData) {
      if (!that.left.isDown && STORAGE.female.vy === 0) {
        STORAGE.female.vx = 0
        STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
      }
    }

    this.down.press = function(mouseData) {
      STORAGE.female.vy = 5
      STORAGE.female.vx = 0
      STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-0/qte-fall"]
    }
    this.down.release = function(mouseData) {
      if (!that.up.isDown && STORAGE.female.vx === 0) {
        STORAGE.female.vy = 0
        STORAGE.animatedFemale._textures = STORAGE.sheet.animations["elle-end/dance1"]
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
