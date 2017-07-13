<template lang="pug">
  .page.portfolio
    .slider-dots(ref="dots")
      .slider-dots__dot(
        @click="setSlide(i)"
        v-for="dot, i in slides")
      .slider-dots__dot.active(:style="{width: oneDotWidth / slides.length + 'px', transform: 'translateX(' + (oneDotWidth / slides.length * slideIndex) + 'px)'}")
    .slider-container(@click="sidesClick" ref="container", :class="{'cursorLeft': cursorLeft, 'cursorRight': cursorRight}")
      .slider(ref="slider")
        .slider-content(:style="{width: slidesWidth + 'px', transform: 'translate3d(' + translateOffset  + 'px,0,0)'}")
          .slider-item(
            ref="slideWidth"
            v-for="slide, index in slides",
            :class="{'previous': index < slideIndex, 'active': index === slideIndex, 'next': index > slideIndex }")
            .slider-item__inner(@click="eventStopPropagation")
              nuxt-link(:to="'/portfolio/' + (slide.alias ? slide.alias : index)")
                .slider-item__name
                  | {{ slide.title }}
                .slider-item__description
                  | {{ slide.subtitle }}
                img(:src="getCover(slide.cover)")
</template>

<script>

import { db } from '~/db'
import { mapGetters } from 'vuex'
const $portfolio = db.ref('portfolio')

export default {
  name: 'Portfolio',

  head: {
    title: 'Sunroof | Portfolio'
  },

  fetch ({ store }) {
    return store.dispatch('setPortfolioRef', $portfolio)
  },

  data () {
    return {
      buttonsBlocked: false,
      direction: 'left',
      canSlide: true,
      slideIndex: 0,
      slidesWidth: null,
      cursorLeft: false,
      cursorRight: false,
      oneDotWidth: 0
    }
  },

  computed: {
    ...mapGetters(['slides']),

    translateOffset () {
      return -(this.slidesWidth / this.slides.length) * this.slideIndex
    }
  },

  mounted () {
    setTimeout(() => {
      this.oneDotWidth = (window.getComputedStyle(this.$refs.dots).width).replace('px', '')
      this.slidesWidth = this.getSlidesWidth()
    }, 300)

    window.addEventListener('keydown', this.slideOnKey)
    window.addEventListener('mousemove', this.changeCursorOnMove)

    if (window.outerWidth > 768) {
      window.onresize = () => {
        this.slidesWidth = this.getSlidesWidth()
      }

      window.addEventListener('keydown', this.slideOnKey)
      window.addEventListener('mousemove', this.changeCursorOnMove)
    }

    if (window.outerWidth < 768) {
      window.removeEventListener('keydown', this.slideOnKey)
      window.removeEventListener('mousemove', this.changeCursorOnMove)
    }
  },

  destroyed () {
    window.onresize = null

    window.removeEventListener('keydown', this.slideOnKey)
    window.removeEventListener('mousemove', this.changeCursorOnMove)
  },

  methods: {
    eventStopPropagation (e) {
      e.preventDefault()
      e.stopPropagation()
    },

    getCover (url) {
      return '//' + url.replace('http://', '').replace('https://', '')
    },

    slideOnKey (e) {
      if (e.keyCode === 37) {
        this.onSlide(this.prev, this.slides)
      }

      if (e.keyCode === 39) {
        this.onSlide(this.next, this.slides)
      }
    },

    changeCursorOnMove (e) {
      this.cursorRight = window.innerWidth / 2 < e.clientX
      this.cursorLeft = window.innerWidth / 2 > e.clientX
    },

    sidesClick () {
      if (this.cursorRight) {
        this.onSlide(this.next, this.slides)
      }

      if (this.cursorLeft) {
        this.onSlide(this.prev, this.slides)
      }
    },

    getSlideWidth () {
      return this.$refs.slideWidth[0].clientWidth
    },

    getSlidesWidth () {
      return (this.getSlideWidth() * this.slides.length) - 2
    },

    blockButtons () {
      this.buttonsBlocked = true
    },

    unblockButtons () {
      this.buttonsBlocked = false
    },

    onSlide (func, slides) {
      if (this.canSlide) {
        this.canSlide = false

        this.$refs.container.classList.add('slider-container--sliding')
        func(slides)

        setTimeout(() => {
          this.canSlide = true
          this.$refs.container.classList.remove('slider-container--sliding')
        }, 400)
      }
    },

    next (slides) {
      if (this.buttonsBlocked) {
        return
      }

      if (this.slideIndex + 1 === this.slides.length) {
        this.slideIndex = -1
      }

      this.slideIndex = Math.min(this.slideIndex + 1, slides.length - 1)
    },

    prev (slides) {
      if (this.buttonsBlocked) {
        return
      }

      if (this.slideIndex === 0) {
        this.slideIndex = this.slides.length
      }

      this.slideIndex = Math.max(this.slideIndex - 1, 0)
    },

    setSlide (i) {
      this.slideIndex = i
    }
  }
}
</script>

<style scoped lang="scss">
  .portfolio-enter-active, .portfolio-leave-active {
    transition: opacity .5s ease;
  }

  .portfolio-enter-active {
    transition-delay: .5s;
  }

  .portfolio-enter, .portfolio-leave-active {
    opacity: 0;
  }

  .portfolio {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    transform: translate3d(0, 0, 0);
  }

  .slider {
    height: 100%;
    width: 100%;
    max-width: 55%;
    margin: 0 auto;
    text-align: center;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    span {
      height: 70vh;
      width: 100%;
      display: block;
    }
  }

  .slider-container {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    &--sliding {
      pointer-events: none;
    }

    &.cursorLeft {
      cursor: url('../../assets/left.svg'), auto;
    }

    &.cursorRight {
      cursor: url('../../assets/right.svg'), auto;
    }
  }

  .slider-dots {
    width: 250px;
    background: rgba(11, 30, 38, 0.2);

    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    z-index: 11;
  }

  .slider-dots__dot {
    cursor: pointer;
    flex: 1;
    height: 3px;
    transition: background .2s ease, transform 1s ease;
    will-change: background, transform;

    &:hover {
      background: rgba(11, 30, 38, 0.4);
    }

    &.active {
      position: absolute;
      left: 0;
      top: 0;
      background: #2f626d;
    }
  }

  .slider-content {
    display: block;
    transition: transform 1s ease;
    transform: translate3d(0, 0, 0);
    will-change: transform;
    white-space: nowrap;
  }

  .slider-item {
    display: inline-block;
    vertical-align: middle;
    width: 55vw;
    padding: 0 100px;

    transition: transform 0.5s ease, opacity 1s ease;
    will-change: opacity, transform;

    &:last-child {
      margin-right: 0;
    }

    a {
      text-decoration: none;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

      &:hover {
        .slider-item__name {
          border-color: #F8E5C1;
        }
        img {
          box-shadow: 0 0 6px 0 rgba(0,0,0,0.07), 0 6px 6px 0 rgba(0,0,0,0.14);
        }
      }
    }

    &.previous {
      pointer-events: none;
      opacity: 0.5;
    }

    &.next {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .slider-item img {
    height: 100%;
    width: 100%;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.07), 0 2px 2px 0 rgba(0,0,0,0.14);
    border-radius: 5px;
    transition: box-shadow 0.5s ease;
  }

  .slider-item__inner {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .slider-item__margin {
    margin-bottom: 40px;
  }

  .slider-item__name {
    margin-bottom: 10px;

    font-size: 33px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
    border-bottom: 7px solid rgba(255,255,255,0);
    line-height: 16px;
    transition: border-color 0.3s ease;
  }

  .slider-item__description {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
    letter-spacing: 0;
    line-height: 20px;
    margin-bottom: 20px;
  }

  .slider-prev,
  .slider-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    cursor: pointer;

    height: 11px;
    width: 23px;
  }

  .slider-prev {
    background: url('../../assets/left.svg') no-repeat center / contain;
    left: 30px;
  }

  .slider-next {
    background: url('../../assets/right.svg') no-repeat center / contain;
    right: 30px;
  }

  @media (max-width: 768px) {
    .slider-dots {
      display: none;
    }

    .slider-container {
      padding: 100px 0;
    }

    .slider {
      max-width: 100%;
    }

    .slider-content {
      width: 100% !important;
      transform: translate3d(0,0,0) !important;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

    .slider-item {
      margin-bottom: 70px;
      width: 100%;
      display: block;
      padding: 0;

      &.next,
      &.previous {
        opacity: 1;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .slider-item a {
      padding: 0 20px;
      width: 100%;
    }

    .slider-item__inner {
      width: 100%;
    }

    .slider-item__name {
      margin-bottom: 5px;
      width: 100%;
      white-space: pre-wrap;
      line-height: 25px;
    }

    .slider-item__description {
      margin-bottom: 20px;
      white-space: pre-wrap;
      padding: 0 23px;
    }

    .slider-item img {
      border-radius: 6px;
    }

    .slider-item__margin {
      margin-bottom: 20px;
    }
  }
</style>
