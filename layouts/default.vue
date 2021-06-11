<template>
  <div :class="mainClass">
    <Main />
    <Particles v-if="!isTouchDevice" />
    <nuxt />
  </div>
</template>

<script>
import components from '~/components'
import isTouchDevice from '~/js/isTouchDevice'

export default {
  components,

  data () {
    return {
      isTouchDevice: false
    }
  },

  mounted () {
    this.isTouchDevice = isTouchDevice()
  },

  computed: {
    mainClass() {
      return {
        'touch-device': this.isTouchDevice
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/style/global.scss";
</style>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>