<template>
  <Overlay>
    <div class="content">
      <Foto :width="3456" :height="5184" class="portrait" src="/images/dshanna-krito-black-white.jpg">
        Dshanna and Krito performing in studio<br />
        Photography by <a href="http://www.daspima.com" target="_blank">Clara Haseloff</a>
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
  mixins: [content('/live')]
}
</script>

<style lang="scss" scoped>
.content {
  min-width: 70vw;
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