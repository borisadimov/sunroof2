<template lang="pug">
  .page.portfolio
    .slider(ref="slider")
      .slider-prev(@click="onSlide(prev, slides)")
      .slider-next(@click="onSlide(next, slides)")
      transition-group(:name="direction")
        .slider-item(:key="JSON.stringify(slide)" v-for="slide, index in slidesToShow", :class="slide.class")
          .slider-item__name
            | {{ slide.data.name }}
          .slider-item__description
            | {{ slide.data.description }}
          img(src="../assets/portfolio/1.jpg")
</template>

<script>
export default {
  name: 'Portfolio',
  data () {
    return {
      direction: 'left',
      // isDown: false,
      // startX: null,
      // scrollLeft: null,
      canSlide: true,
      slideIndex: 0,
      slides: [
        { id: 1, name: 'Dragon Drop 1', description: 'Digital Concept, Design, UI/UX, Development' },
        { id: 2, name: 'Dragon Drop 2', description: 'Digital Concept, Design, UI/UX, Development' },
        { id: 3, name: 'Dragon Drop 3', description: 'Digital Concept, Design, UI/UX, Development' },
        { id: 4, name: 'Dragon Drop 4', description: 'Digital Concept, Design, UI/UX, Development' },
        { id: 5, name: 'Dragon Drop 5', description: 'Digital Concept, Design, UI/UX, Development' }
      ]
    }
  },

  components: {

  },

  // mounted () {
  //   const { slider } = this.$refs

  //   slider.addEventListener('mousedown', (e) => {
  //     this.isDown = true
  //     this.startX = e.pageX - slider.offsetLeft
  //     this.scrollLeft = slider.scrollLeft
  //   })

  //   slider.addEventListener('mouseleave', (e) => {
  //     this.isDown = false
  //   })

  //   slider.addEventListener('mouseup', (e) => {
  //     this.isDown = false
  //   })

  //   slider.addEventListener('mousemove', (e) => {
  //     if (!this.isDown) return
  //     e.preventDefault()

  //     const x = e.pageX - slider.offsetLeft
  //     const walk = (x - this.startX) * 3

  //     if (walk > 100) {
  //       return this.prev(this.slides)
  //     } else if (walk < -100) {
  //       return this.next(this.slides)
  //     }
  //   })
  // },

  computed: {
    slidesToShow () {
      const previousSlideIndex = this.slideIndex === 0 ? this.slides.length - 1 : this.slideIndex - 1
      const nextSlideIndex = this.slideIndex === this.slides.length + 1 ? 0 : this.slideIndex + 1
      return [
        { class: 'previous', data: this.slides[previousSlideIndex] },
        { class: 'active', data: this.slides[this.slideIndex] },
        { class: 'next', data: this.slides[nextSlideIndex] }
      ]
    }
  },

  methods: {
    onSlide (func, slides) {
      if (this.canSlide) {
        this.canSlide = false
        func(slides)
        setTimeout(() => { this.canSlide = true }, 250)
      }
    },

    next (slides) {
      this.direction = 'left'
      this.slideIndex = this.slideIndex < slides.length - 1 ? this.slideIndex + 1 : 0
    },

    prev (slides) {
      this.direction = 'right'
      this.slideIndex = this.slideIndex > 0 ? this.slideIndex - 1 : slides.length - 1
    },

    activeSlide (slides) {
      return this.slides.filter((s, i) => i === this.slideIndex)
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

    position: relative;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    span {
      position: relative;
      width: 100%;
      height: 100%;
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
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    transition: transform .5s ease;
    transform: translate3d(0,0,0);

    &.previous {
      transform: translate3d(-50%, 0, 0)
    }

    &.next {
      transform: translate3d(50%, 0, 0)
    }

    &.left-enter {
      transform: translate3d(100%,0,0);
    }

    &.left-leave-active {
      transform: translate3d(-100%,0,0);
    }

    &.left-leave {
      transition-delay: .05s;
    }

    &.right-enter {
      transform: translate3d(-100%,0,0);
    }

    &.right-leave-active {
      transform: translate3d(100%,0,0);
    }

    &.right-leave {
      transition-delay: .05s;
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
