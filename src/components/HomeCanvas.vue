<template>
  <div class="home-canvas">
    <canvas id="canvas"></canvas>
      <div class="mark-wrapper">
        <div class="svg-wrapper">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="111.6" height="112.2" viewBox="0 0 111.6 112.2" xml:space="preserve">
            <g class="st0">
              <g>
                <g>
                  <g>
                    <path class="st1 XlDBzDyx_0" d="M56.1,2L77.4,23.3L83.1,29L79.9,32.2"></path>
                    <path class="st1 XlDBzDyx_1" d="M56.1,15.5"></path>
                  </g>
                  <path class="st1 XlDBzDyx_2" d="M83.1,29L110.2,29"></path>
                  <path class="st1 XlDBzDyx_3" d="M56.1,56.1L83.1,56.1"></path>
                </g>
                <g>
                  <g>
                    <path class="st1 XlDBzDyx_4" d="M2,110.2L23.3,88.8L29,83.1L25.8,79.9"></path>
                    <path class="st1 XlDBzDyx_5" d="M2,96.6"></path>
                  </g>
                  <path class="st1 XlDBzDyx_6" d="M29,83.1L56.1,83.1"></path>
                  <path class="st1 XlDBzDyx_7" d="M2,56.1L29,56.1"></path>
                </g>
                <path class="st1 XlDBzDyx_8" d="M25.8,79.9L2,56.1L15.5,42.6L29,29L56.1,29L29,56.1L36,63L56.1,83.1L42.6,96.6L29,110.2L2,110.2L
                  2,83.1L15.5,69.6"></path>
                <path class="st1 XlDBzDyx_9" d="M79.9,32.2L56.1,56.1L69.6,69.6L83.1,83.1L110.2,83.1L83.1,56.1L90.1,49.1L110.2,29L96.6,15.5L
                  83.1,2L56.1,2L56.1,29L69.6,42.6"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div class="name-wrapper">
        <div class="svg-wrapper name">
          <svg id="sunroof-logo" class="hide" version="1.1" x="0px" y="0px" width="237" height="82" viewBox="0 50 237 82" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" letter-spacing="10" font-family="Fairview" font-size="83">
                    <g stroke="#ffffff" stroke-width="1" opacity="0.7">
                        <text>
                            <tspan x="3.77" y="118">sunroof</tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </div>

        <div class="svg-wrapper name">
          <svg version="1.1" x="0px" y="82px" width="237" height="82" viewBox="0 50 237 82" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" letter-spacing="10" font-family="Fairview" font-size="83">
                    <g stroke="#ffffff" stroke-width="1">
                        <text class="sunroof-white">
                            <tspan x="3.77" y="118">sunroof</tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </div>
      </div>
      <text-writer></text-writer>
  </div>

</template>

<script>
import TextWriter from './TextWriter'

export default {
  name: 'HomeCanvas',
  data () {
    return {
      arrayOfSentences: [
        'design-obsessed digital junkies',
        'sometimes really cool people',
        'people who fill out this sentence'
      ]
    }
  },

  mounted () {
    function getRandomInt (min, max, exept) {
      var i = Math.floor(Math.random() * (max - min + 1)) + min
      if (typeof exept === 'undefined') return i
      else if (typeof exept === 'number' && i === exept) return getRandomInt(min, max, exept)
      else if (typeof exept === 'object' && (i >= exept[0] && i <= exept[1])) return getRandomInt(min, max, exept)
      else return i
    }

    function degToRad (deg) {
      return deg * (Math.PI / 180)
    }

    var colors = []
    colors[2] = []
    colors[2]['background'] = '#F8E5C1'
    colors[2][1] = 'rgba(47,98,109,'
    colors[2][2] = 'rgba(149,188,154,'
    colors[2][3] = 'rgba(244,142,92,'
    colors[2][4] = 'rgba(65,64,66'

    var colorTheme = 2

    function Person (id) {
      this.id = id
      this.width = getRandomInt(3, 6)
      this.height = this.width
      this.x = getRandomInt(0, (canvas.width - this.width))
      this.y = getRandomInt(0, (canvas.height - this.height))
      this.speed = (this.width <= 10) ? 2 : 1
      this.alpha = 1
      this.alphaReduction = getRandomInt(1, 3) / 1000
      this.color = colors[colorTheme][getRandomInt(1, colors[colorTheme].length - 1)]
      this.direction = getRandomInt(0, 360)
      this.turner = getRandomInt(0, 1) === 0 ? -1 : 1
      this.turnerAmp = getRandomInt(1, 2)
      this.isHit = false
      this.stepCounter = 0
      this.changeDirectionFrequency = getRandomInt(1, 200)
      this.nextActionIndex = 0
      this.shape = 2
      this.shadowBlur = getRandomInt(5, 25)

      Person.prototype.nextAction = function () {
        switch (this.nextActionIndex) {
          case 0 : return this.walk()
          case 1 : return this.stop()
          default : this.walk()
        }
      }

      Person.prototype.stop = function () {
        this.update()
      }

      Person.prototype.walk = function () {
        var nextX = this.x + Math.cos(degToRad(this.direction)) * this.speed
        var nextY = this.y + Math.sin(degToRad(this.direction)) * this.speed

        // Limits of the canvas
        if (nextX >= (canvas.width - this.width) && (this.direction < 90 || this.direction > 270)) {
          nextX = canvas.width - this.width
          this.direction = getRandomInt(90, 270, this.direction)
        }

        if (nextX <= 0 && (this.direction > 90 && this.direction < 270)) {
          nextX = 0
          var exept = [90, 270]
          this.direction = getRandomInt(0, 360, exept)
        }

        if (nextY >= (canvas.height - this.height) && (this.direction > 0 && this.direction < 180)) {
          nextY = canvas.height - this.height
          this.direction = getRandomInt(180, 360, this.direction)
        }

        if (nextY <= 0 && (this.direction > 180 && this.direction < 360)) {
          nextY = 0
          this.direction = getRandomInt(0, 180, this.direction)
        }

        this.x = nextX
        this.y = nextY

        this.stepCounter++

        if (this.changeDirectionFrequency && this.stepCounter === this.changeDirectionFrequency) {
          this.turner = this.turner === -1 ? 1 : -1
          this.turnerAmp = getRandomInt(1, 2)
          this.stepCounter = 0
          this.changeDirectionFrequency = getRandomInt(1, 200)
        }

        this.direction += this.turner * this.turnerAmp

        this.update()
      }

      Person.prototype.takeOppositeDirection = function () {
        // Right -> Left
        if ((this.direction >= 0 && this.direction < 90) || (this.direction > 270 && this.direction <= 360)) {
          this.direction = getRandomInt(90, 270)
          return
        }

        // Left -> Right
        if (this.direction > 90 && this.direction < 270) {
          var exept = [90, 270]
          this.direction = getRandomInt(0, 360, exept)
          return
        }

        // Bottom -> Top
        if (this.direction > 0 && this.direction < 180) {
          this.direction = getRandomInt(180, 360)
          return
        }

        // Top -> Bottom
        if (this.direction > 180) {
          this.direction = getRandomInt(0, 180)
        }
      }

      Person.prototype.update = function () {
        context.beginPath()

        context.fillStyle = this.color + this.alpha + ')'
        context.arc(this.x + (this.width / 2), this.y + (this.height / 2), this.width / 2, 0, 2 * Math.PI, false)
        context.shadowColor = this.color + this.alpha + ')'
        context.shadowBlur = this.shadowBlur
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.fill()

        if (this.id > 15) {
          this.alpha -= this.alphaReduction
          if (this.alpha <= 0) this.die()
        }
      }

      Person.prototype.die = function () {
        persons[this.id] = null
        delete persons[this.id]
      }
    }

    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')
    var canvasWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
    var canvasHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    var requestAnimationFrame = window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame
    var persons = []
    var numberOfperson = (canvasWidth * canvasHeight <= 320000) ? 25 : 15
    var worldIsPaused = false
    var birthToGive = 25

    canvas.setAttribute('width', canvasWidth)
    canvas.setAttribute('height', canvasHeight)

    start()

    function start () {
      canvas.style.display = 'block'
      instantiatePopulation()
      animate()
    }

    function instantiatePopulation () {
      let i = 0
      while (i < numberOfperson) {
        persons[i] = new Person(i)
        i++
      }
    }

    function animate () {
      if (worldIsPaused) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      context.beginPath()

      // Creating a copy of the array persons
      var personsOrder = persons.slice(0)
      // Sort in y-axis position order (to manage z-indexes)
      personsOrder.sort(function (a, b) {
        return a.y - b.y
      })

      // Paint instances in sorted order
      for (var i in personsOrder) {
        var u = personsOrder[i].id
        persons[u].nextAction()
      }

      requestAnimationFrame(animate)
    }

    canvas.onclick = function (e) {
      giveBirth(e, birthToGive)
    }

    function giveBirth (e, u) {
      var i = persons.length
      persons[i] = new Person(i)
      persons[i].x = e.layerX
      persons[i].y = e.layerY

      if (u > 1) giveBirth(e, u - 1)
    }
  },

  components: {
    TextWriter
  }
}
</script>

<style scoped lang="scss">
  .home-canvas {
    background: linear-gradient(135deg, #f8e5c1, #F9CEA2, #F7AA78, #95bc9a, #2f626d);
    background-size: 200% 200%;
    animation: backgroundGradient 45s linear infinite;
    height: 100%;
    width: 100%;

    transform: translate3d(0,0,0);
    will-change: transform;
  }

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

  @font-face {
    font-family: 'Fairview';
    src: url('../../static/fonts/Fairview_SmallCaps.otf');
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  html, body {
      height: 100%;
      width: 100%;
      margin: 0;
  }

  span {
    font-size: 12px;
  }

  svg {
    position: absolute;
    top: 40%;
    left: 50%;
    margin-right: 50%;
    transform: translateX(-50%);
  }

  text {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    -webkit-animation: draw 5s forwards;
    -moz-animation: draw 5s forwards;
    -o-animation: draw 5s forwards;
    -ms-animation: draw 5s forwards;
    animation: draw 10s forwards;
  }

  .hide {
    -webkit-animation: fadeInOut2 1s linear forwards;
    -moz-animation: fadeInOut2 1s linear forwards;
    -o-animation: fadeInOut2 1s linear forwards;
    -ms-animation: fadeInOut2 1s linear forwards;
    animation: fadeInOut2 3s linear forwards;
  }

  .background {
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
  }

  .svg-wrapper {
      display: block;
      position: fixed;
      top: 45%;
      left: 50%;
      margin-top: -70px;
      margin-left: -110px;
  }

  .text-crawl {
      display: block;
      position: fixed;
      letter-spacing: 1px;
      top: 56%;
      left: 40%;
      margin-top: 0;
      margin-left: -15px;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      -webkit-animation: fadeIn 2s 10s;
      -moz-animation: fadeIn 2s 10s;
      animation: fadeIn 2s;
      animation-delay: 2s;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
      opacity: 0;
  }

  /* logo */

  .name {
      margin-top: 0;
      margin-left: 0;
      letter-spacing: 10px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
  }

  .sunroof-white {
      fill: rgba(255, 255, 255, 0.8);
      opacity: 0;
      -webkit-animation: fadeIn 2s ease;
      -moz-animation: fadeIn 2s ease;
      animation: fadeIn 2s ease;
      -webkit-animation-delay: 2s;
      -moz-animation-delay: 2s;
      animation-delay: 1.5s;
      -webkit-animation-fill-mode: forwards;
      -moz-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
  }

  .st0 {
      opacity: 0.7;
  }

  .st1 {
      fill: none;
      stroke: #FFFFFF;
      stroke-width: 4;
      stroke-linejoin: bevel;
      stroke-miterlimit: 10;
  }

  .XlDBzDyx_0 {
      stroke-dasharray: 43 45;
      stroke-dashoffset: 44;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_1 {
      stroke-dasharray: 0 2;
      stroke-dashoffset: 1;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_2 {
      stroke-dasharray: 28 30;
      stroke-dashoffset: 29;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_3 {
      stroke-dasharray: 27 29;
      stroke-dashoffset: 28;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_4 {
      stroke-dasharray: 43 45;
      stroke-dashoffset: 44;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_5 {
      stroke-dasharray: 0 2;
      stroke-dashoffset: 1;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_6 {
      stroke-dasharray: 28 30;
      stroke-dashoffset: 29;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_7 {
      stroke-dasharray: 27 29;
      stroke-dashoffset: 28;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_8 {
      stroke-dasharray: 288 290;
      stroke-dashoffset: 289;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  .XlDBzDyx_9 {
      stroke-dasharray: 288 290;
      stroke-dashoffset: 289;
      animation: XlDBzDyx_draw 2500ms ease-in-out 0ms forwards;
  }

  @-webkit-keyframes fadeInOut {
      0% {
          opacity: 0;
      }
      50% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }

  @-moz-keyframes fadeInOut {
      0% {
          opacity: 0;
      }
      50% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }

  @keyframes fadeInOut {
      0% {
          opacity: 0;
      }
      50% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }

  @-webkit-keyframes fadeOutIn {
      0% {
          opacity: 1;
      }
      50% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @-moz-keyframes fadeOutIn {
      0% {
          opacity: 1;
      }
      50% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @keyframes fadeOutIn {
      0% {
          opacity: 1;
      }
      50% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @-webkit-keyframes fadeIn {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @-moz-keyframes fadeIn {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @keyframes fadeIn {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @-webkit-keyframes fadeOut {
      from {
          opacity: 1;
      }
      to {
          opacity: 0;
      }
  }

  @-moz-keyframes fadeOut {
      from {
          opacity: 1;
      }
      to {
          opacity: 0;
      }
  }

  @keyframes fadeOut {
      from {
          opacity: 1;
      }
      to {
          opacity: 0;
      }
  }

  @-webkit-keyframes backgroundRotate {
      0% {
          transform: rotate(0deg);
      }
      50% {
          transform: rotate(180deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  @-moz-keyframes backgroundRotate {
      0% {
          transform: rotate(0deg);
      }
      50% {
          transform: rotate(180deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  @keyframes backgroundRotate {
      0% {
          transform: rotate(0deg);
      }
      50% {
          transform: rotate(180deg);
      }
      100% {
          transform: rotate(360deg);
      }
  }

  @keyframes draw {
      100% {
          stroke-dashoffset: 0;
      }
  }

  @-webkit-keyframes fadeInOut2 {
      0%, 100% {
          opacity: 0;
      }
      50% {
          opacity: 0.7;
      }
  }

  @keyframes fadeInOut2 {
      0%, 100% {
          opacity: 0;
      }
      50% {
          opacity: 0.7;
      }
  }

  @keyframes XlDBzDyx_draw {
      100% {
          stroke-dashoffset: 0;
      }
  }

  @keyframes XlDBzDyx_fade {
      0% {
          stroke-opacity: 1;
      }
      93.33333333333333% {
          stroke-opacity: 1;
      }
      100% {
          stroke-opacity: 0;
      }
  }
</style>
