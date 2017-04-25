<template>
  <div class="page-wrapper">
    <NavBar></NavBar>
    <div class="page-content">
      <div class="article-detail">
        <header>
          <h1>{{detail.name}}</h1>
          <p>{{time}}</p>
        </header>
        <div class="markdown-body" ref="content" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Marked from 'marked'
import Highlight from 'highlight.js'
import Moment from 'moment'
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
  watch: {
    html () {
      this.$nextTick(() => {
        document.querySelectorAll('.markdown-body code').forEach((val, index) => {
          Highlight.highlightBlock(val)
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
    NavBar
  },
  methods: {
    getArticleDetail () {
      let that = this
      this.$axios.get('/article?id=' + this.id)
      .then(function (response) {
        // console.log(response)
        that.detail = response.data.data
        document.title = response.data.data.name
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

<style scoped>
@import url("../assets/markdown.css");

.article-detail {
  margin-bottom: 20px;
}

.article-detail header h1 {
  font-size: 35px;
}

.article-detail header p {
  line-height: 40px;
  color: gray;
}
</style>
