const PIXI = require('pixi.js')

import Renderer from './components/Renderer.class.js'
import Loader from './components/Loader.class.js'
import Sprite from './components/Sprite.class.js'


window.STORAGE = {}
console.log("storage", STORAGE)

window.onload = function() {
  	console.log("hello")
  	initCanvas()
}

function initCanvas() {
  new Renderer()
  new Loader()
  new Sprite()
  render()
}

function render() {
  // requestAnimationFrame(render)
  // STORAGE.renderer.render(STORAGE.stage)
}
