<template lang="pug">
  .page.portfolio
    .slider(ref="slider")
      .slider-prev(@click="onSlide(prev, slides)")
      .slider-next(@click="onSlide(next, slides)")
      transition-group(
        :name="direction",
        mode="in-out",
        v-on:before-enter="blockButtons",
        v-on:after-enter="unblockButtons"
      )
        router-link.slider-item(:to="'/portfolio/' + slide.data.id", :key="JSON.stringify(slide)" v-for="slide, index in slidesToShow", :class="slide.class")
          .slider-item__name
            | {{ slide.data.name }}
          .slider-item__description
            | {{ slide.data.description }}
          img(src="../assets/portfolio/1.jpg")
</template>

<script>
import content from '@/config/fixtures'

export default {
  name: 'Portfolio',
  data () {
    return {
      buttonsBlocked: false,
      direction: 'left',
      // isDown: false,
      // startX: null,
      // scrollLeft: null,
      canSlide: true,
      slideIndex: 0,
      slides: content
    }
  },

  computed: {
    slidesToShow () {
      const previousSlideIndex = this.slideIndex === 0 ? this.slides.length - 1 : this.slideIndex - 1
      const nextSlideIndex = this.slideIndex === this.slides.length - 1 ? 0 : this.slideIndex + 1
      return [
        { class: 'previous', data: this.slides[previousSlideIndex] },
        { class: 'active', data: this.slides[this.slideIndex] },
        { class: 'next', data: this.slides[nextSlideIndex] }
      ]
    }
  },

  methods: {
    blockButtons () {
      this.buttonsBlocked = true
    },

    unblockButtons () {
      this.buttonsBlocked = false
    },

    onSlide (func, slides) {
      if (this.canSlide) {
        this.canSlide = false
        func(slides)
        setTimeout(() => { this.canSlide = true }, 250)
      }
    },

    next (slides) {
      if (this.buttonsBlocked) {
        return
      }
      this.direction = 'left'
      this.slideIndex = this.slideIndex < slides.length - 1 ? this.slideIndex + 1 : 0
    },

    prev (slides) {
      if (this.buttonsBlocked) {
        return
      }
      this.direction = 'right'
      this.slideIndex = this.slideIndex > 0 ? this.slideIndex - 1 : slides.length - 1
    },

    activeSlide (slides) {
      return this.slides.filter((s, i) => i === this.slideIndex)
    },

    setSlide (i) {
      if (this.slideIndex < i) {
        this.direction = 'left'
      } else {
        this.direction = 'right'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .portfolio {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .slider {
    overflow: hidden;
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 30px;
    text-align: center;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    span {
      height: 70vh;
      width: 100%;
      display: block;
    }
  }

  .slider-item {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    transition: transform 1s ease;
    transform: translate3d(0,0,0);
    will-change: transform;

    text-decoration: none;

    &.previous {
      transform: translate3d(-50%, 0, 0);
      will-change: transform;
      pointer-events: none;
    }

    &.next {
      transform: translate3d(50%, 0, 0);
      will-change: transform;
      pointer-events: none;
    }

    &.next {
      &.right-enter {
        transform: translate3d(0%, 0, 0);
        will-change: transform;
        opacity: 0;
      }

      &.right-leave-to {
        transform: translate3d(100%, 0, 0);
        will-change: transform;
      }

      &.left-leave {
        transform: translate3d(50%, 0, 0);
        will-change: transform;
      }

      &.left-enter {
        transform: translate3d(100%, 0, 0);
        will-change: transform;
      }

      &.left-enter-to {
        transform: translate3d(50%, 0, 0);
        will-change: transform;
      }

      &.left-leave-to {
        transform: translate3d(0%, 0, 0);
        will-change: transform;
        transition: transform 1s ease;
      }
    }

    &.active {
      &.right-enter {
        transform: translate3d(-50%, 0, 0);
        will-change: transform;
        opacity: 0;
      }

      &.right-leave-to {
        opacity: 0;
      }

      &.left-leave {
        transform: translate3d(0%, 0, 0);
        will-change: transform;
      }

      &.left-enter-to {
        opacity: 0;
      }

      &.left-leave-to {
        transform: translate3d(-50%, 0, 0);
        will-change: transform;
        transition: transform 1s ease;
      }

    }

    &.previous {
      &.right-enter {
        transform: translate3d(-100%, 0, 0);
        will-change: transform;
        opacity: 0;
      }

      &.right-leave-to {
        opacity: 0;
      }

      &.left-leave {
        transform: translate3d(-50%, 0, 0);
        will-change: transform;
      }

      &.left-enter-to {
        opacity: 0;
      }

      &.left-leave-to {
        transform: translate3d(-100%, 0, 0);
        will-change: transform;
        transition: transform 1s ease;
      }
    }
  }

  .slider-item img {
    max-height: 375px;
    height: 100%;
  }

  .slider-item__name {
    margin-bottom: 10px;

    font-size: 26px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .slider-item__description {
    margin-bottom: 40px;

    font-size: 12px;
    color: rgba(0,0,0,0.40);
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
