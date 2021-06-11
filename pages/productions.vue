<template>
  <Overlay>
    <div class="content">
      <Foto :width="2240" :height="4032" class="portrait" src="/images/studio.jpeg">
        Home studio in Berlin Wedding
      </Foto>
      <Markdown :document="doc" />
      <div class="clear" />
    </div>
  </Overlay>
</template>

<script>
import components from '~/components'
import content from '~/mixins/content'

export default {
  components,
  mixins: [content('/productions')]
}
</script>

<style lang="scss" scoped>
.content {
  min-width: 70vw;
  @media (max-width: 1200px) {
    min-width: 90vw;
  }
}

.portrait {
  width: 35vw;
  height: auto;
  float: left;
  margin-right: 40px;
  margin-bottom: 20px;
}

.clear {
  margin-bottom: -20px;
  clear: both;
}
</style>