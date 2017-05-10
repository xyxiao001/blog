<template>
  <div class="page-wrapper">
    <NavBar></NavBar>
    <div class="page-content">
      <div class="article-detail" v-show="!loading">
        <header>
          <h1>{{detail.name}}</h1>
          <p>
            <span>{{time}}</span>
            <span class="viewNum"> 浏览 {{ view }} 次</span>
          </p>
        </header>
        <div class="markdown-body" ref="content" v-html="html"></div>
      </div>
      <Loading v-show="loading"></Loading>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Marked from 'marked'
import '@/assets/highlight.pack.js'
import Moment from 'moment'
import NavBar from '@/components/NavBar'
import Foot from '@/components/Foot'
import Loading from '@/components/Loading'
import ScrollReveal from 'scrollreveal'

export default {
  data: function () {
    return {
      id: '',
      view: 0,
      loading: true,
      detail: {
        name: '',
        time: '',
        tags: [],
        content: ''
      },
      scrollReveal: ScrollReveal()
    }
  },
  watch: {
    html () {
      this.$nextTick(() => {
        document.querySelectorAll('.markdown-body code').forEach((val, index) => {
          window.hljs.highlightBlock(val)
          this.scrollReveal.reveal('.markdown-body', {
            duration: 1000,
            dealy: 200,
            scale: 0,
            origin: 'bottom',
            distance: '10px',
            mobile: false,
            rotate: { x: 0, y: 0, z: 0 }
          }, 1000)
        })
      })
    }
  },
  computed: {
    html () {
      return Marked(this.detail.content)
    },
    time () {
      return Moment(this.detail.time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    NavBar,
    Foot,
    Loading
  },
  methods: {
    getArticleDetail () {
      let that = this
      this.$axios.get('/article?id=' + this.id)
      .then(function (response) {
        // console.log(response)
        that.loading = false
        that.detail = response.data.data
        document.title = response.data.data.name
        that.scrollReveal.reveal('.article-detail header', {
          duration: 1000,
          dealy: 500,
          scale: 0,
          origin: 'top',
          distance: '20px',
          mobile: false
        }, 500)
      })
      .catch(function (error) {
        that.loading = false
        console.log(error)
      })
    }
  },
  created () {
    var that = this
    window.scrollTo(0, 0)
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getArticleDetail()
    this.$axios('/addPageView?name=' + this.id + '&add=true')
    .then(function (response) {
      if (response.data.status === 1) {
        that.view = response.data.view
      }
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
@import url("../assets/markdown.css");
@import url("../assets/highlight.css");

.article-detail {
  margin-bottom: 20px;
}

.article-detail header {
  margin-bottom: 50px;
}

.article-detail header h1 {
  font-size: 35px;
}

.article-detail header span {
  line-height: 40px;
  color: gray;
}


@media screen and (max-width: 800px) {
  .article-detail header h1 {
    font-size: 25px;
  }
}
</style>
