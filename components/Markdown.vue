<template>
  <nuxt-content class="markdown-content" :document="document" />  
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.markdown-content {
  font-size: 24px;

  @media (max-width: 1000px) {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 18px;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 20px;

    @media (max-width: 1000px) {
      margin-bottom: 16px;
    }
  }

  h2 {
    margin-top: 60px;
    margin-bottom: 20px;

    @media (max-width: 1000px) {
      margin-top: 40px;
      margin-bottom: 16px;
    }
  }

  h3 {
    margin-top: 40px;
    margin-bottom: 4px;

    @media (max-width: 1000px) {
      margin-top: 26px;
      margin-bottom: 4px;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Bebas Neue", sans serif;
  }

  p {
    margin-top: 4px;
    margin-bottom: 20px;

    @media (max-width: 1000px) {
      margin-top: 4px;
      margin-bottom: 16px;
    }
  }

  p, ul, li {
    font-family: 'Roboto', serif;
    line-height: 1.35;
  }

  a, a:visited {
    color: #333;
  }
}
</style>