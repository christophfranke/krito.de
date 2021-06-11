<template>
  <div class="background">
    <div class="overlay" @mousemove.stop>
      <nuxt-link class="close" to="/">Close</nuxt-link>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.overlay {
  a {
    color: #333;
  }
}
</style>

<style lang="scss" scoped>
.background {  
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);

  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
}
.overlay {
  background: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  pointer-events: auto;
  position: relative;
  padding: 20px;
  max-width: 90vw;
  max-height: 80vh;
  @media (max-width: 500px) {
    max-width: 100vw;
    padding: 10px;
    max-height: calc(100vh - 20px);
  }
}
.close {
  font-family: "Bebas Neue", sans serif;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  @media (max-width: 500px) {
    top: 10px;
    right: 10px;
  }
  color: #333;
  z-index: 4;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>