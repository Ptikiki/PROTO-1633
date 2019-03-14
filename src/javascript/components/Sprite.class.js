const PIXI = require('pixi.js')
const projection = require('pixi-projection')

class Sprite {

  constructor(options) {
    STORAGE.spriteClass = this
    STORAGE.state
    STORAGE.loader = new PIXI.loaders.Loader()
    STORAGE.loader
      .add("bg", "assets/background.jpg")
      .add("assets/sprites/atlas.json")
      .load(this.setup)

    // directions
    this.left = STORAGE.spriteClass.keyboard("ArrowLeft")
    this.up = STORAGE.spriteClass.keyboard("ArrowUp")
    this.right = STORAGE.spriteClass.keyboard("ArrowRight")
    this.down = STORAGE.spriteClass.keyboard("ArrowDown")
  }

  setup() {
    let objs = []

    // camera
    // STORAGE.camera = new PIXI.projection.Camera3d()
    // STORAGE.camera.setPlanes(300, 10, 1000, false)
    // STORAGE.camera.position.set(600, 0)
    // STORAGE.camera.position3d.y = -0 // STORAGE.camera is above the ground
    // STORAGE.app.stage.addChild(STORAGE.camera)
    // console.log(STORAGE.camera)

    // STORAGE.bgLayer = new PIXI.projection.Container3d()
    // STORAGE.bgLayer.proj.affine = PIXI.projection.AFFINE.AXIS_X
    // STORAGE.camera.addChild(STORAGE.bgLayer)
    // STORAGE.bgLayer.position3d.z = 0
    STORAGE.background = PIXI.Sprite.fromImage("assets/background.jpg")
    STORAGE.background.y = -STORAGE.background.height + 1000
    STORAGE.app.stage.addChild(STORAGE.background)
    // STORAGE.bgLayer.addChild(background)

    STORAGE.sheet = STORAGE.loader.resources["assets/sprites/atlas.json"].spritesheet
    console.log("sheet", STORAGE.sheet)
    STORAGE.female = new PIXI.Sprite(STORAGE.sheet.textures["elle-1/land0.png"])
    STORAGE.female.vx = 0
    STORAGE.female.vy = 0

    // sprites animation
    STORAGE.animatedFemale = new PIXI.extras.AnimatedSprite(STORAGE.sheet.animations["elle-0/land"])
    console.log("sprite female", STORAGE.animatedFemale)
    STORAGE.animatedFemale.animationSpeed = 0.5
    STORAGE.animatedFemale.transform.scale = {_x : 5, _y : 5}
    STORAGE.animatedFemale.position.set(window.innerWidth/2, window.innerHeight/1.2)
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
    // STORAGE.animatedFemale.x += STORAGE.female.vx
    STORAGE.animatedFemale.y += STORAGE.female.vy
    // STORAGE.camera.position3d.x = STORAGE.animatedFemale.x

    // version sans 3D
    STORAGE.background.x -= STORAGE.female.vx 
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
