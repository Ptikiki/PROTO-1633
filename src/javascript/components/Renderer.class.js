const PIXI = require('pixi.js')

class Renderer {

    constructor(options) {
      this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true, transparent: false, resolution: 1})

      STORAGE.app = this.app
      //STORAGE.loader = this.app.loader
      STORAGE.stage = this.app.stage

      STORAGE.stage.interactive = true


      this.init()
    }

    init() {
      document.body.appendChild(this.app.view)


      // STORAGE.camera = new PIXI.projection.Camera3d()
      // STORAGE.camera.setPlanes(300, 10, 1000, false)
      // STORAGE.camera.position.set(app.screen.width / 2, 0)
      // STORAGE.camera.position3d.y = -500 // STORAGE.camera is above the ground
      // STORAGE.stage.addChild(STORAGE.camera)


    }
}

export default Renderer
