export default (route) => ({
  async asyncData({ $content }) {
    const doc = await $content(route).fetch()

    return {
      doc
    }
  }  
})