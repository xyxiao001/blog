<template>
  <div class="comment">
    <p style="line-height: 30px;">发表评论：</p>
    <input type="text" class="x-input" v-model="username" placeholder="你的昵称呢？" />
    <div
      class="comment-edit"
      contenteditable="true"
      @keyup="changeComment"
      @mouseup="changeComment"
      ref="commentEdit"
      :data-comment="comment.length + '/ 1000'"
      ></div>
    <div class="comment-control">
      <i class="iconfont icon-icon" @click.stop="emoji = !emoji"></i>
      <div class="x-emoji" v-show="emoji" @click.stop>
        <a class="emoji-item" v-for="i in 24" @click="chooseEmoji">
          <img :data-src='"http://opq9z7jxu.bkt.clouddn.com/" + i + ".gif"' />
        </a>
        <a class="emoji-item" v-for="j in 5" @click="chooseEmoji">
          <img :data-src='"http://opq9z7jxu.bkt.clouddn.com/" + (25 +j) + ".jpg"' />
        </a>
      </div>
      <button class="x-btn" @click="addComment" v-if="canAdd">发表</button>
      <button class="x-btn btn-disabled" v-else>发表</button>
    </div>
    <div class="comment-list" ref="commentList">
      <p><span>评论列表：</span><span class="comment-total">当前加载 {{ comments.length }} 条, 总计: {{ totalComment }} 条</span></p>
      <div class="comment-item" v-for="item in comments">
        <p class="c-title">{{ item.username }}</p>
        <div v-html="item.comment" class="c-content"></div>
        <div class="c-time" :data-time="item.time">
          <span>{{ item.timeDes }}</span>
          </div>
      </div>
    </div>
    <div class="add-more" v-show="comments.length < totalComment" :class="{disabled: addMore}">
      <button type="button" @click="getMore">{{ addMsg }}</button>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import ScrollReveal from 'scrollreveal'
import Xss from 'xss'

export default {
  data: function () {
    return {
      emoji: false,
      addLoading: false,
      canAdd: false,
      username: '',
      comment: '',
      totalComment: 0,
      page: 1,
      limit: 5,
      addMore: false,
      addMsg: '点击加载更多..',
      scrollReveal: ScrollReveal(),
      comments: []
    }
  },
  watch: {
    username () {
      this.username = this.username.replace(/(^\s*)|(\s*$)/g, '')
      if (this.username.length > 0 && this.comment.length > 0 && this.comment.length < 1000) {
        this.canAdd = true
      } else {
        this.canAdd = false
      }
    },
    comment () {
      if (this.username.length > 0 && this.comment.length > 0 && this.comment.length < 1000) {
        this.canAdd = true
      } else {
        this.canAdd = false
      }
    },
    emoji () {
      if (this.emoji) {
        [].slice.call(document.querySelectorAll('.emoji-item img')).forEach((i) => {
          if (!i.getAttribute('src')) {
            i.setAttribute('src', i.getAttribute('data-src'))
          }
        })
      }
    },
    addMore () {
      this.addMsg = !this.addMore ? '点击加载更多..' : '加载中...'
    }
  },
  methods: {
    changeComment (e) {
      this.comment = e.target.innerHTML
    },

    chooseEmoji (e) {
      this.editInsert(this.$refs.commentEdit, e.target.parentNode.innerHTML)
      this.comment = this.$refs.commentEdit.innerHTML
      // this.$refs.commentEdit.focus()
      this.emoji = !this.emoji
    },

    addComment () {
      let that = this
      var cdata = {
        articleId: this.$route.query.id,
        username: that.username,
        comment: that.comment,
        time: new Date()
      }
      this.$axios.post('/addComment', cdata)
      .then(function (response) {
        that.username = ''
        that.comment = ''
        that.$refs.commentEdit.innerHTML = ''
        cdata.time = Moment(cdata.time).format('YYYY-MM-DD HH:mm:ss')
        cdata.timeDes = Moment(cdata.time).fromNow()
        that.comments.unshift(cdata)
        that.totalComment += 1
      })
      .catch(function (error) {
        console.log(error)
      })
    },

    editInsert (obj, str) {
      if (document.selection) {
        var sel = document.selection.createRange()
        sel.text = str
      } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart
        var endPos = obj.selectionEnd
        var cursorPos = startPos
        var tmpStr = obj.innerHTML
        obj.innerHTML = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length)
        cursorPos += str.length
        obj.selectionStart = obj.selectionEnd = cursorPos
      } else {
        obj.innerHTML += str
      }
    },

    // 获取评论
    getComments () {
      var that = this
      this.canAdd = false
      this.$axios.get('getComment?id=' + this.$route.query.id + '&page=' + this.page + '&limit=' + this.limit)
      .then((response) => {
        this.addMore = false
        if (response.data.status === 1) {
          that.totalComment = response.data.all
          that.comments = this.comments.concat(response.data.data.map((item) => {
            return ({
              _id: item._id,
              articleId: item.articleId,
              username: item.username,
              comment: Xss(item.comment),
              replyList: item.replyList,
              agree: item.agree,
              disagree: item.disagree,
              time: Moment(item.time).format('YYYY-MM-DD HH:mm:ss'),
              timeDes: Moment(item.time).fromNow()
            })
          }))
        }
        that.$nextTick(() => {
          that.scrollReveal.reveal('.comment-item', {
            container: that.$refs.commentList,
            duration: 500,
            dealy: 100,
            scale: 0,
            origin: 'bottom',
            distance: '30px',
            reset: true,
            rotate: { x: 0, y: 0, z: 0 }
          }, 200)
          that.scrollReveal.sync()
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },

    // 加载更多
    getMore () {
      this.addMore = true
      this.page += 1
      this.getComments()
    }
  },
  mounted () {
    this.page = this.$route.query.page ? ~~(this.$route.query.page) : 1
    Moment.locale('zh-cn')
    this.getComments()
    window.addEventListener('click', () => {
      if (this.emoji) {
        this.emoji = !this.emoji
      }
    })
  }
}
</script>

<style scoped>
  .comment-edit {
    position: relative;
    line-height: 20px;
    padding: 3px 8px 20px 8px;
    background: none;
    font-size: 14px;
    box-shadow: inset 0 2px 4px 0 rgba(0,0,0,.04);
    min-height: 100px;
    max-height: 300px;
    border: 1px solid #dedede;
    overflow-y: auto;
    outline: none;
    transition: all .3s;
  }

  .comment-edit:focus {
    border: 1px solid #108ee9;
  }

  .comment-edit::after {
    /*display: none;*/
    content: attr(data-comment);
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #a0a1a7;
  }

  .comment-control {
    position: relative;
    padding: 8px 0px;
    margin-bottom: 20px;
  }

  .comment-control button {
    float: right;
  }

  .comment-control i {
    position: absolute;
    top: 0;
    font-size: 25px;
    cursor: pointer;
    color: #a0a1a7;
    transition: all .3s ease-out;
  }

  .comment-control i:hover {
    color: black;
  }

  .x-emoji {
    position: absolute;
    min-height: 100px;
    bottom: 15px;
    padding: 10px;
    background: #fff;
    color: #5f5f5f;
    width: 340px;
    border: 1px solid #E6E6E6;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  }

  .emoji-item {
    display: inline-block;
    width: auto;
    height: auto;
    cursor: pointer;
  }

  .comment-list {
    padding-top: 15px;
  }

  .comment-list>p {
    width: 100%;
    line-height: 35px;
  }

  .comment-total {
    float: right;
    color: #808080;
  }

  .comment-item {
    padding: 20px 0;
  }


  .c-title {
    font-size: 18px;
    color: #333;
    font-weight: 700;
  }

  .c-content {
    padding: 10px 0;
  }

  .c-time {
    position: relative;
    display: inline-block;
    color: #808080;
    font-size: 14px;
    line-height: 30px;
  }

  .c-time::before {
    position: absolute;
    content: '';
    top: 22px;
    left: 30px;
    width: 0;
    height: 0;
    margin: 0 0 0 -6px;
    font-size: 0;
    color: rgba(0, 0, 0, .8);
    border-bottom: 6px solid currentColor;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    visibility: hidden;
    opacity: 0.9;
  }

  .c-time::after {
    position: absolute;
    top: 0;
    content: attr(data-time);
    top: 28px;
    left: 30px;
    padding: 10px 16px;
    border-radius: 4px;
    white-space: nowrap;
    line-height: 1.5;
    font-size: 13px;
    color: #fff;
    background: rgba(0, 0, 0, .8);
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0.9;
    letter-spacing: 1px;
  }

  .c-time:hover::after, .c-time:hover::before {
    visibility: visible;
  }

  .add-more button {
    display: block;
    margin: 15px auto;
    border: 1px solid #d3d3d3;
    padding: 10px 0;
    cursor: pointer;
    font-weight: 500;
    text-align: center;
    background-color: #f8f8f8;
    color: #333;
    font-size: 12px;
    outline: 0;
    height: 100%;
    width: 95%;
    font-size: 16px;
    background-image: linear-gradient(to top,#fcfcfc 0,#f8f8f8 100%);
  }

  .disabled button {
    cursor: not-allowed;
  }
</style>

<style>
  .comment-edit img {
    display: inline-block!important;
    max-width: 200px!important;
    height: auto!important;
  }

  .comment-item img {
    display: inline-block!important;
    max-width: 100%!important;
    height: auto!important;
  }

  .x-btn {
    display: inline-block;
    font-weight: 500;
    text-align: center;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 5px 20px;
    font-size: 12px;
    border-radius: 4px;
    user-select: none;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    position: relative;
    color: white;
    background-color: #108ee9;
    border-color: #108ee9;
    outline: 0;
  }

  .x-input {
    position: relative;
    display: inline-block;
    margin: 5px 0px;
    padding: 4px 7px;
    width: 150px;
    height: 25px;
    cursor: text;
    font-size: 14px;
    line-height: 1.2;
    color: rgba(0,0,0,.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
    outline: 0;
  }

  .btn-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
