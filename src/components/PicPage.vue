<template>
  <div>
    <div v-if="isLoggedIn">
      <div v-if="!allImages.length">
        fetching images...
      </div>
      <div v-else class="images-container">
        <div v-for="image in allImages" :key="image.id">
          <img :src="image.link" alt="image" class="img-column" >
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Login to start!</h2>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ImageList',
  props: ['actionToFetch'],
  data() {
    return {
      imgFavUrl: 'https://i.imgur.com'
    }
  },
  methods: {
    ...mapActions(['fetchMyImages', 'fetchFavorites', 'wipeImages']),
  },
  computed: {
    ...mapGetters(['allImages', 'isLoggedIn'])
  },
  mounted() {
    this[this.actionToFetch]()
  },
  watch: {
    actionToFetch(newValue) {
      this.wipeImages().then(() => {
        this[newValue]()
      })
    }
  }
}
</script>
