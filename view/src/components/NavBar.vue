<template>
  <nav class="navbar">
    <router-link to="/" class="icon">
      <img src="http://ofyaji162.bkt.clouddn.com/icon.png" alt="">
    </router-link>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  }
}
</script>

<style scoped>
  .navbar {
    padding: 20px  20px 0 20px;
  }

  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    overflow: hidden;
  }

  .icon img {
    width: 100%;
  }
</style>
