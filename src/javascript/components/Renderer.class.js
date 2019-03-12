const PIXI = require('pixi.js')

class Renderer {

    constructor(options) {
      this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true, transparent: false, resolution: 1})

      //this.renderer = new PIXI.CanvasRenderer(window.innerWidth, window.innerHeight, { antialias: true, clearBeforeRender: false })
      //this.stage = new PIXI.Container()

      // STORAGE.renderer = this.renderer
      // STORAGE.stage = this.stage
      STORAGE.app = this.app

      this.init()
    }

    init() {
      // this.renderer.view.classList.add('webGLRenderer')
      document.body.appendChild(this.app.view)
      //document.body.appendChild(this.renderer.view)
    }
}

export default Renderer
