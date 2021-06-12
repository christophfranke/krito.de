export default {
  target: 'static',
  modules: [
    '@nuxt/content'
  ],
  head: {
    title: 'Krito | Electronic Music',
    meta: [{
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, user-scalable=no'
    }],
    link: [{
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto'
    }]
  },
  plugins: ['~/plugins/global-components']
}