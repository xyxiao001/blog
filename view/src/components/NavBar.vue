<template>
  <nav class="navbar">
    <router-link to="/" class="icon">
      <img src="http://cdn.xyxiao.cn/%E5%B0%8F%E6%81%B6%E9%AD%94.png" alt="">
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
    padding: 20px  20px 20px 20px;
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

  @media screen and (max-width: 800px) {
    .navbar {
      padding: 10px;
    }
  }
</style>
