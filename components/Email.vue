<template>
  <a :href="displayedMailto">{{ displayedEmail }}</a>
</template>

<script>
const to = 'abcdefghijklmnopqrstuvwxyz.@'
const from = '@.qwertzuiopasdfghjklyxcvbnm'
const rotate = (str) => str.split('').map(ch => to.split('')[from.split('').indexOf(ch)]).join('')

export default {
  name: 'Email',
  props: {
    encrypted: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      displayedEmail: null
    }
  },

  computed: {
    displayedMailto () {
      return `mailto:${this.displayedEmail}`
    }
  },

  mounted () {
    this.displayedEmail = rotate(this.encrypted)
  }
}
</script>