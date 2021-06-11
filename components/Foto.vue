<template>
  <div class="foto">
    <img :src="src" :width="width" :height="height" class="image" />
    <div class="credits">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: block;
  width: 100%;
  height: auto;
}

.credits {
  font-family: 'Roboto', sans serif;
  font-size: 16px;
} 
</style>