/* global IS_DEV, IS_ARCADE, IS_CHANGI, IS_RETAIL */

import { createStore } from '@internet/state'

// Dirty "mobile" check to avoid UI mess on mobile when debugging
// function isTouch () { return 'ontouchstart' in window }

// const isDev = IS_DEV
// const isArcade = IS_ARCADE
// const isChangi = IS_CHANGI
// const isRetail = IS_RETAIL
const ratio = window.devicePixelRatio <= 2 ? 1 : 1.5

export default createStore({
  levelDict: {
    0: 'studio',
    1: 'city',
    2: 'sky',
    3: 'space',
    4: 'end'
  },

  pixelRatio: ratio,
  useRound: 0, // Round parallax values

  // useCustomFont: window.__conf.useCustomFont,

  // No qte - No clicking interface - Used for arcade board
  // arcade: isDev ? 0 : !!isArcade,
  arcadeRebootDelay: 14000, // Delay before reboot when afk

  // changi: !!isChangi,
  // retail: !!isRetail,

  // ---- Debug utilities ----
  // directQTE: isDev ? 0 : 0, // Auto launch QTE
  // level: isDev ? 0 : 0, // Current level
  // instantPreload: isDev ? 1 : 0, // Load without transitions
  // instantDisclaimers: isDev ? 1 : 0, // No Disclaimers
  // // mute: isDev ? 0 : 0, // Mute game
  // forceFramerate: isDev ? 0 : 0, // Limit FPS
  // noBlock: isDev ? 0 : 0, // Disable blocks
  // noBlockDelay: isDev ? 0 : 0, // Blocks will instantly appear
  // mockCountry: isDev ? 'fr' : false, // mock a specific country code
  // debugBodies: isDev ? 0 : 0, // Display bodies bounding boxes
  // useGui: isDev ? 1 : 0, // use datGui
  // openGui: isDev ? 0 : 0, // auto open datGui
  // displayStats: isDev ? 1 : 0, // use stats (fps, drawcalls, ...)

  // ---- i18n ----
  // lang: window.__conf.lang,
  // loc: window.__conf.loc,
  // languages: Object.keys(languages),

  // ---- blocks / bubbles  ----
  comboMaxDist: 5, // Maximum distance to combo blocks
  blockSpawnArea: 240, // Width of area to spawn blocks
  debugSpawnArea: false, // Display spawning area
  bubbleSpawnArea: 220, // Area for bubble to spawn

  // baseUrl: window.__conf.baseUrl,

  gaid: 'UA-130857400-1', // Google analytics ID
  gaidRetail: 'UA-130857400-2', // Google analytics ID
  grpd: false, // Set to true when cookies are allowed
  retailerUrl: null, // Used to add a shop url

  // Used to zoom the camera when landing / jumping
  landZoom: 0.25,
  landZoomDamping: 0.007,
  jumpZoomDamping: 0.007,

  pause: false, // Is the game paused
  hint: '', // Current hint key displayed

  qte: false, // True when you are in a QTE

  frameDuration: 70, // default animation's frame duration
  gravity: 2,

  // bottom offset in px for the camera - disable it in the camera controller resize() method
  cameraBottom: 100,
  cameraZoomDamping: 0.002, // 0.001
  cameraTargetDamping: 0.006,
  cameraPanDamping: 0.006,
  cameraShakeDamping: 0.008,

  // Only used on desktop
  cursor: [0, 0],

  // Screen & Device infos
  size: [0, 0],
  screenHeight: 0,
  screenWidth: 0,
  orientation: null,
  device: {},

  // Stuff to preload
  atlases: {
    sheet: 'assets/atlas.json',
    smoothsheet: 'assets/atlas-smooth.json'
  },

  // Animations will be stored here
  animations: {},

  // Non-animated textures will be stored here
  textures: {},

  // Used to manage scaling of the pixi scene
  sceneScale: 1,
  scalePoints: [
    [2],
    [2.5, 600, 0],
    [3, 1200, 0],
    [3.5, 1600, 0]
  ],

  // app version number
  // version: VERSION,  global VERSION 

  // player
  elle: null,
  heroStates: { ALIVE: 0, DEAD: 1, QTE: 2, END: 3 },

  // Score and current obstacle object
  score: 0,
  currentPlatform: null,

  // Used to add FX from the player to the current level component
  currentLevel: null,

  // UI
  menuVisible: false,

  // images to preload
  // url will be replaced by <img> HTML Element you can clone
  images: {
    introBattery: 'assets/gif/lowbattery.gif',
    introCookie: 'assets/gif/grpd.gif',
    introUnmute: 'assets/gif/unmute.gif',
    introUnsupported: 'assets/gif/warning.gif',
    rotate: 'assets/gif/rotate.gif'
  },

  // Image to preload - used to avoid preload image that will not be used
  imagesToPreload: [],

  // USED BY GAME COMPONENT TO DISPLAY OR NOT UI ELEMENTS
  // main title is visible
  titleVisible: false,
  // big bubble hint is visible
  bubblehintVisible: false,
  // used as class on Game <section>
  transitioning: false,
  // is menubutton visible
  menubuttonVisible: false,
  // is score visible
  scoreVisible: false,
  // Text at the end
  winTextVisible: false,
  // Menu at the end
  endMenuVisible: false,
  // is logo visible
  logoVisible: false,
  // is clickCursor visible
  clickCursorVisible: false,
  // is logo has a shadow (only level 1)
  logoShadow: false,
  // used to link level studio to UI components
  colorSwitchStudio: 'red1'
})
