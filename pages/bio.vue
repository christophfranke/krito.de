<template>
  <Overlay>
    <div class="content">
      <h1 class="mobile-only">Bio</h1>
      <Foto :width="4000" :height="6000" class="portrait" src="/images/prophet.jpg">
        Photography by Jane Nagler
      </Foto>
      <h1 class="desktop-only">Bio</h1>
      <Markdown :document="doc" />
      <div class="clear" />
      <Foto :width="6000" :height="4000" class="playing" src="/images/poly-d-2.jpg">
        Photography by Jane Nagler
      </Foto>
    </div>
  </Overlay>
</template>

<script>
import components from '~/components'
import content from '~/mixins/content'

export default {
  components,
  mixins: [content('/bio')]
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

.playing {
  width: 100%;
  height: auto;
}

.clear {
  clear: both;
}
</style>