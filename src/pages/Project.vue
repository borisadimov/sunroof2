<template lang="pug">
  .page.project
    .project__name
      | {{ project.name }}
    .project__description
      | {{ project.description }}
    img.project__image(:src="'/static/portfolio/' + project.preview_image")
</template>

<script>
import content from '@/config/fixtures'

export default {
  name: 'Project',

  computed: {
    project () {
      return content.filter(i => +i.id === +this.$route.params.id)[0]
    }
  }
}
</script>

<style scoped lang="scss">
  .project {

  }
</style>
