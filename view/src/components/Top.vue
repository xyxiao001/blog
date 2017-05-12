<template>
  <div class="go-top" v-show="show">
    <i class="iconfont icon-top" @click="goTop"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    goTop () {
      window.scrollTo(0, 0)
    }
  },
  mounted () {
    window.onscroll = () => {
      window.scrollY > 600 ? this.show = true : this.show = false
    }
  }
}
</script>

<style scoped>
  .go-top {
    position: fixed;
    z-index: 999;
    right: 5%;
    bottom: 5%;
  }

  .go-top i {
    font-size: 30px;
    opacity: 0.8;
    cursor: pointer;
  }
</style>
