<template>
  <div class="page-wrapper">
    <NavBar></NavBar>
    <div class="page-content">
      <div class="article-detail">
        <h1>{{detail.name}}</h1>
        <div>{{detail.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  data: function () {
    return {
      id: '',
      detail: {
        name: '',
        time: '',
        tags: [],
        content: ''
      }
    }
  },
  components: {
    NavBar
  },
  methods: {
    getArticleDetail () {
      let that = this
      this.$axios.get('/article?id=' + this.id)
      .then(function (response) {
        // console.log(response)
        that.detail = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getArticleDetail()
  }
}
</script>

</style>
