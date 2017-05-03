<template lang="pug">
  .page.portfolio
    .slider-dots(ref="dots")
      .slider-dots__dot(
        :class="{'active': slideIndex === i}"
        @click="setSlide(i)"
        v-for="dot, i in slides")
    .slider-container(ref="container", :class="{'cursorLeft': cursorLeft, 'cursorRight': cursorRight}")
      .slider(ref="slider")
        // .slider-prev(@click="onSlide(prev, slides)")
        // .slider-next(@click="onSlide(next, slides)")
        .slider-content(:style="{width: slidesWidth + 'px', transform: 'translate3d(' + translateOffset  + 'px,0,0)'}")
          .slider-item(
            ref="slideWidth"
            v-for="slide, index in slides",
            :class="{'previous': index < slideIndex, 'active': index === slideIndex, 'next': index > slideIndex }")
            router-link(:to="'/portfolio/' + slide.id")
              .slider-item__name
                | {{ slide.title }}
              .slider-item__description
                | {{ slide.subtitle }}
              img(:src="'/static/portfolio/' + slide.preview_image")
</template>

<script>
import content from '@/config/fixtures'

export default {
  name: 'Portfolio',
  data () {
    return {
      buttonsBlocked: false,
      direction: 'left',
      canSlide: true,
      slideIndex: 0,
      slides: content,
      slidesWidth: null,
      cursorLeft: false,
      cursorRight: false
    }
  },

  computed: {
    translateOffset () {
      return -(this.slidesWidth / this.slides.length) * this.slideIndex
    }
  },

  mounted () {
    this.slidesWidth = this.getSlidesWidth()

    window.addEventListener('keydown', this.slideOnKey)
    window.addEventListener('mousemove', this.changeCursorOnMove)
    window.addEventListener('click', this.sidesClick)
  },

  destroyed () {
    window.removeEventListener('keydown', this.slideOnKey)
    window.removeEventListener('mousemove', this.changeCursorOnMove)
    window.removeEventListener('click', this.sidesClick)
  },

  methods: {
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
      return this.getSlideWidth() * this.slides.length
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
  .portfolio {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    transform: translate3d(0, 0, 0);
  }

  .slider {
    height: 100%;
    width: 100%;
    max-width: 60%;
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
    padding: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    &--sliding {
      pointer-events: none;
    }

    &.cursorLeft {
      cursor: url('../assets/left.svg'), auto;
    }

    &.cursorRight {
      cursor: url('../assets/right.svg'), auto;
    }
  }

  .slider-dots {
    width: 40%;
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
    height: 5px;

    background: rgba(11, 30, 38, 0.2);
    transition: background .2s ease;
    will-change: background;

    &:hover {
      background: rgba(11, 30, 38, 0.4);
    }

    &.active {
      background: #414042;
    }
  }

  .slider-content {
    display: block;
    transition: transform 1s ease;
    transform: translate3d(0, 0, 0);
    will-change: transform;
  }

  .slider-item {
    display: inline-block;
    vertical-align: middle;
    width: 60vw;

    transition: transform 0.5s ease, opacity 1s ease;
    will-change: opacity, transform;

    a {
      text-decoration: none;
    }

    // &:hover {
    //   transform: scale(1.07);
    // }

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
    max-height: 375px;
    height: 100%;
  }

  .slider-item__name {
    margin-bottom: 10px;

    font-size: 26px;
    color: rgba(0, 0, 0, 0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .slider-item__description {
    margin-bottom: 40px;

    font-size: 12px;
    color: rgba(0, 0, 0, 0.40);
    letter-spacing: 0;
    line-height: 18px;
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
    background: url('../assets/left.svg') no-repeat center / contain;
    left: 30px;
  }

  .slider-next {
    background: url('../assets/right.svg') no-repeat center / contain;
    right: 30px;
  }
</style>
