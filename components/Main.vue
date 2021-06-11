<template>
  <div class="content-container" @click="home">
    <h1 class="krito">Krito</h1>
    <h2 class="subtitle">
      Electronic Music / Artist / Producer
    </h2>
    <h3 class="subpages" @click.stop>
      <nuxt-link class="navlink" to="/bio">
        <div class="colored">Bio</div><div class="white">Bio</div>
      </nuxt-link>
      <nuxt-link class="navlink" to="/productions">
        <div class="colored">Productions</div><div class="white">Productions</div>
      </nuxt-link>
      <nuxt-link class="navlink" to="/live">
        <div class="colored">Live</div><div class="white">Live</div>
      </nuxt-link>
    </h3>
    <h2 class="links" @click.stop>
      <a href="https://soundcloud.com/kritokrito" target="_blank" class="social-link">
        <img class="soundcloud logo hover" src="/logos/soundcloud.svg">
        <img class="soundcloud logo white" src="/logos/soundcloud-white.svg">
      </a>
      <a href="https://open.spotify.com/user/kritokrito" target="_blank" class="social-link spotify-link">
        <img class="spotify logo hover" src="/logos/spotify.svg">
        <img class="spotify logo white" src="/logos/spotify-white.svg">
      </a>
      <a href="https://www.instagram.com/kritokritokrito/" target="_blank" class="social-link">
        <img class="instagram logo hover" src="/logos/instagram.svg">
        <img class="instagram logo white" src="/logos/instagram-white.svg">
      </a>
    </h2>
    <nuxt-link to="/imprint" class="imprint" @click.stop>
      Imprint
    </nuxt-link>
  </div>
</template>

<script>
export default {
  methods: {
    home () {
      if (this.$route.name !== 'index') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: "Bebas Neue", sans serif;
  color: white;
  cursor: default;
}


.krito {
  font-size: 25vw;
  margin: 0;
  text-align: center;
}

.subtitle {
  margin: 0;
  margin-top: -5vw;
  font-size: 5vw;
  font-family: 'Roboto', serif;
}

.subpages {
  margin: 0;
  margin-top: 10vh;
  font-size: 3vw;
}

.navlink {
  display: inline-block;
  transition: transform .3s;
  position: relative;
  z-index: 0;

  &:hover {
    transform: scale(1.15);
    z-index: 1;
  }
  
  div {
    display: inline-block;
    color:  white;
    text-decoration: none;
    margin: 0 1vw;
  }
  .white {
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .colored {
    background: linear-gradient(90deg, rgba(255,255,0,1) 0%, rgba(0,255,0,1) 50%, rgba(0,0,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0;
    transition: opacity .3s;
    position: absolute;
  }

  &:hover .colored {
    opacity: 1;
  }

  div:before {
    display: inline-block;
    content:'→';
    margin-right: 10px;
    transition: margin .3s;
  }

  &:hover div:before {
    margin-right: 0;
    margin-left: 10px;
  }
}

.description {
  margin: 0;
}

.links {
  margin-top: 2vh;
  display: flex;
  font-size: 3vw;
  line-height: 3vw;
}


.spotify-link {
  display: none;
}

.logo {
  will-change: transform;
  transition: transform 0.3s;
  height: 3vw;
  width: auto;
  margin: 0 2vw;
  display: block;
  z-index: 1;

  .social-link:hover & {
    transform: scale(1.15);
  }


  @media (max-width: 800px) {
    height: 8vw;
  }


  &.hover {
    display: block;
    position: absolute;
    opacity: 0;
    will-change: transform, opacity;
    transition: transform 0.3s, opacity 0.3s;
    z-index: 2;
    &:hover {
      opacity: 1;
    }
  }
}


@media (max-width: 800px) {
  .links {
    font-size: 8vw;
  }
  .logo {
    height: 8vw;
  }
}

.imprint {
  font-family: 'Bebas Neue', sans serif;
  font-size: 18px;
  color: white;
  display: block;
  position: fixed;
  bottom: 2vh;
  right: 2vw;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  z-index: 2;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>