<template>
  <div class="page-wraper">
    <header>
      <NavBar></NavBar>
    </header>
    <div class="page-content">
      <div class="user-info">
        <a href="https://github.com/xyxiao001" target="_blank" title="goodboy">
          <img src="http://cdn.xyxiao.cn/goodboy.jpg"><img>
        </a>
      </div>
      <div class="article-list" v-show="!loading" ref="articleList">
        <div v-for="item in lists" :key="item.id">
          <ArticleItem :item="item" ></ArticleItem>
        </div>
      </div>
      <Loading v-show="loading"></Loading>
      <Pagination :current="page" :allPages="allPages" @onChangePage="changePage" v-show="!loading"></Pagination>
    </div>
    <Top></Top>
    <Foot></Foot>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'
import Foot from '@/components/Foot'
import Loading from '@/components/Loading'
import Top from '@/components/Top'
import ScrollReveal from 'scrollreveal'
export default {
  data () {
    return {
      lists: [],
      limit: 5,
      page: 1,
      loading: true,
      allPages: 0,
      scrollReveal: ScrollReveal()
    }
  },
  components: {
    NavBar,
    ArticleItem,
    Pagination,
    Foot,
    Top,
    Loading
  },
  methods: {
    getArticle () {
      let that = this
      this.$axios.get('/article?page=' + that.page + '&limit=' + that.limit)
      .then(function (response) {
        that.loading = false
        that.allPages = response.data.allPages
        that.page = that.page > that.allPages ? that.allPages : that.page
        that.lists = response.data.data
        that.$nextTick(() => {
          that.scrollReveal.reveal('.article-item', {
            container: that.$refs.articleList,
            duration: 600,
            dealy: 200,
            scale: 0,
            origin: 'bottom',
            distance: '30px',
            reset: true,
            rotate: { x: 0, y: 0, z: 0 }
          }, 200)
          that.scrollReveal.sync()
        })
      })
      .catch(function (error) {
        that.loading = false
        console.log(error)
      })
    },
    changePage (page) {
      this.$router.push({
        path: '/',
        query: { page: page }
      })
      this.$router.go(1)
      this.page = page
      window.scrollTo(0, 0)
      this.loading = true
      this.$nextTick(() => {
        this.getArticle()
      })
    }
  },
  created () {
    document.title = 'goodboy 其实我是一个好人'
    this.page = this.$route.query.page ? ~~(this.$route.query.page) : 1
    this.$nextTick(() => {
      this.getArticle()
    })
  }
}
</script>

<style>
  .page-content {
    position: relative;
    width: 80%;
    max-width: 900px;
    min-height: calc(100vh - 200px);
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
