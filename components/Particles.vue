<template>
  <div id="particle-container"></div>
</template>

<script>
import particles from '~/js/particles'

export default {
  mounted () {
    particles()
  }  
}
</script>

<style lang="scss">
#particle-container {
  canvas {
    position: absolute;
  }
}

#particle-container {
  position: absolute;
  left: 50%;
  top: 50%;
  pointer-events: none;
}

</style>