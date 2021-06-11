<template>
  <Overlay>
    <div class="content">
      <h1>Legal notice</h1>
      <Markdown :document="doc" />
    </div>
  </Overlay>
</template>

<script>
import components from '~/components'
import content from '~/mixins/content'

export default {
  components,
  mixins: [content('/imprint')]
}
</script>

<style lang="scss" scoped>
.content {
  min-width: 50vw;
}

</style>