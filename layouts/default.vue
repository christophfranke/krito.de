<template>
  <div>
    <Main />
    <div id="particle-container"></div>
    <nuxt />
  </div>
</template>

<script>
import Main from '~/components/Main'
import particles from '~/js/particles'

export default {
  components: {
    Main,
  },

  mounted () {
    particles()
  }
}
</script>

<style lang="scss">
@import "~/style/global.scss";

canvas {
  position: absolute;
}
</style>

<style lang="scss" scoped>
#particle-container {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>