<template>
  <div class="page-wraper">
    <header>
      <NavBar></NavBar>
    </header>
    <div class="page-content">
      <div class="article-list">
        <div v-for="item in lists">
          <ArticleItem :item="item"></ArticleItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ArticleItem from '@/components/ArticleItem'
export default {
  data () {
    return {
      lists: [],
      limit: 5,
      page: 1,
      allPages: 0
    }
  },
  components: {
    NavBar,
    ArticleItem
  },
  methods: {
    getArticle () {
      let that = this
      this.$axios.get('/article?page' + that.page + '&limit=' + that.limit)
      .then(function (response) {
        // console.log(response)
        that.allPages = response.data.allPages
        that.lists = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getArticle()
  }
}
</script>

<style>
  .page-content {
    position: relative;
    width: 80%;
    max-width: 710px;
    margin: auto;
    word-wrap: break-word;
  }
</style>
