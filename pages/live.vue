<template>
  <Overlay>
    <div class="content">
      <h1 class="mobile-only">Live</h1>
      <Foto :width="3456" :height="5184" class="portrait" src="/images/dshanna-krito-black-white.jpg">
        Dshanna and Krito performing in studio<br />
        Photography by <a href="http://www.daspima.com" target="_blank">Clara Haseloff</a>
      </Foto>
      <h1 class="desktop-only">Live</h1>
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
  @media (max-width: 1200px) {
    min-width: 90vw;
  }
  @media (max-width: 500px) {
    min-with: 100vw;
    min-height: 100vh;
  }
}

.portrait {
  width: 35vw;
  height: auto;
  float: left;
  margin-right: 40px;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    width: 100%;
    float: none;
    margin: 20px 0;
  }
}

.clear {
  margin-bottom: -20px;
  clear: both;
}
</style>