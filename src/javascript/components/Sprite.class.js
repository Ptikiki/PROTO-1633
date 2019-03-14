const PIXI = require('pixi.js')
const projection = require('pixi-projection')

class Sprite {

  constructor(options) {
    STORAGE.spriteClass = this
    STORAGE.state
    STORAGE.loader = new PIXI.loaders.Loader()
    STORAGE.loader
      .add("bg", "assets/floor.jpg")
      .add("assets/sprites/atlas.json")
      .load(this.setup)

    // directions
    this.left = STORAGE.spriteClass.keyboard("ArrowLeft")
    this.up = STORAGE.spriteClass.keyboard("ArrowUp")
    this.right = STORAGE.spriteClass.keyboard("ArrowRight")
    this.down = STORAGE.spriteClass.keyboard("ArrowDown")
  }

  setup() {
    STORAGE.spriteClass.setBackView()
    STORAGE.spriteClass.setFloor()
    STORAGE.spriteClass.setFemale()
        STORAGE.spriteClass.setFrontView()

    STORAGE.spriteClass.bind()

    // animation frame
    STORAGE.spriteClass.state = STORAGE.spriteClass.play
    STORAGE.app.ticker.add(delta => STORAGE.spriteClass.gameLoop(delta))
  }

  setBackView() {
    STORAGE.backView = PIXI.Sprite.fromImage("assets/backView.jpg")
    STORAGE.app.stage.addChild(STORAGE.backView)
  }  

  setFloor() {
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
    STORAGE.floor = PIXI.Sprite.fromImage("assets/floor.jpg")
    console.log("HA", STORAGE.backView)
    STORAGE.floor.y = 591 // backView height
    STORAGE.app.stage.addChild(STORAGE.floor)
    // STORAGE.bgLayer.addChild(floor)
  }

  setFrontView() {
    STORAGE.frontView = PIXI.Sprite.fromImage("assets/frontView.png")
    STORAGE.frontView.y = window.innerHeight - 390 // frontView height
    STORAGE.app.stage.addChild(STORAGE.frontView)
  }




  setFemale() {
    STORAGE.sheet = STORAGE.loader.resources["assets/sprites/atlas.json"].spritesheet
    console.log("sheet", STORAGE.sheet)
    STORAGE.female = new PIXI.Sprite(STORAGE.sheet.textures["elle-1/land0.png"])
    STORAGE.female.vx = 0
    STORAGE.female.vy = 0

    // sprites animation
    STORAGE.animatedFemale = new PIXI.extras.AnimatedSprite(STORAGE.sheet.animations["elle-0/land"])
    console.log("sprite female", STORAGE.animatedFemale)
    STORAGE.animatedFemale.animationSpeed = 0.4
    STORAGE.animatedFemale.transform.scale = {_x : 5, _y : 5}
    // STORAGE.animatedFemale.position.set(window.innerWidth/2, STORAGE.frontView.y)
    STORAGE.animatedFemale.position.set(window.innerWidth/2, window.innerHeight-200)
    STORAGE.animatedFemale.play()
    STORAGE.app.stage.addChild(STORAGE.animatedFemale)
  }

  bind() {
    let that = this

    this.left.press = function(mouseData) {
      STORAGE.female.vx = -3
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
      STORAGE.female.vy = -3
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
      STORAGE.female.vx = 3
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
      STORAGE.female.vy = 3
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
    // version caméra 3D
    // STORAGE.animatedFemale.x += STORAGE.female.vx
    // STORAGE.camera.position3d.x = STORAGE.animatedFemale.x

    // collisions avec frontView
    // if (STORAGE.animatedFemale.y <= STORAGE.frontView.y 
    //   || -STORAGE.frontView.x+STORAGE.animatedFemale.x >= STORAGE.frontView.width 
    //   || -STORAGE.frontView.x+STORAGE.animatedFemale.x <= 0) {
    //   STORAGE.animatedFemale.y += STORAGE.female.vy
    // } 
    // else {
    //   STORAGE.animatedFemale.y = STORAGE.frontView.y
    // }

    // collisions avec backView
    if (STORAGE.animatedFemale.y >= STORAGE.backView.height 
      || -STORAGE.backView.x+STORAGE.animatedFemale.x >= STORAGE.backView.width 
      || -STORAGE.backView.x+STORAGE.animatedFemale.x <= 0) {
      STORAGE.animatedFemale.y += STORAGE.female.vy
    }
    else {
      STORAGE.animatedFemale.y = STORAGE.backView.height
    }

    // collision bord gauche
    if (STORAGE.floor.x >= 0) {
      STORAGE.floor.x = 0
      STORAGE.backView.x = 0
      STORAGE.frontView.x = 0
    }

    // défilement des paysages
    STORAGE.floor.x -= STORAGE.female.vx 
    STORAGE.backView.x -= STORAGE.female.vx * 0.6
    STORAGE.frontView.x -= STORAGE.female.vx * 1.5
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
