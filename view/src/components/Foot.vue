<template>
  <footer>
    <p>goodboy @2017 博客浏览量 {{ view }} 次</p>
    <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">鄂ICP备17014604号-1</a>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      add: true,
      view: 0
    }
  },
  created () {
    // 需要判断今天是否请求过
    var blogView = JSON.parse(window.localStorage.getItem('blogView'))
    var updateDateDay = (new Date()).getDay()
    if (blogView && (new Date(blogView.time)).getDay() === updateDateDay) {
      this.add = false
    }
    var that = this
    this.$axios('/addPageView?name=total&add=' + this.add)
    .then(function (response) {
      if (response.data.status === 1) {
        that.view = response.data.view
      }
      // 存数据
      window.localStorage.setItem('blogView', JSON.stringify({
        time: new Date(),
        view: response.data.view
      }))
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  footer {
    position: relative;
    margin: 80px 0 0 0;
    padding: 10px 15px;
    font-family: "Open Sans", -apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 16px;
    line-height: 1.75;
    color: #BBC7CC;
    text-align: center;
  }
</style>
