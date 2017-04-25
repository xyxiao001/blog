<template>
  <div class="page-wraper">
    <header>
      <NavBar></NavBar>
    </header>
    <div class="page-content">
      <div class="user-info">
        <a href="https://github.com/xyxiao001" target="_blank" title="goodboy">
          <img src="http://ofyaji162.bkt.clouddn.com/touxiang.jpg"><img>
        </a>
      </div>
      <div class="article-list">
        <div v-for="item in lists">
          <ArticleItem :item="item" :title="item.name"></ArticleItem>
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
    document.title = 'goodboy 其实我是一个好人'
    this.getArticle()
  }
}
</script>

<style>
  .page-content {
    position: relative;
    width: 80%;
    max-width: 900px;
    margin: auto;
    word-wrap: break-word;
  }

  .user-info a {
    display: block;
    margin: auto;
    width: 100px;
    animation: fade-in-down 0.5s ease-out;
  }

  .user-info img {
    width: 100%;
    border-radius: 100%;
  }

  @keyframes fade-in-down {
    0% {
      opacity: 0;
      transform: translate3d(0, -50px, 0);
    }

    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media screen and (max-width: 800px) {
    .page-content {
      width: 95%;
    }
  }
</style>
