<template>
  <div class="comment">
    <p style="line-height: 30px;">发表评论：</p>
    <div
      class="comment-edit"
      contenteditable="true"
      @keyup="changeComment"
      @mouseup="changeComment"
      ref="commentEdit"
      :data-comment="comment.length + '/300'"
      ></div>
    <div class="comment-control">
      <i class="iconfont icon-icon" @click.stop="emoji = !emoji"></i>
      <div class="x-emoji" v-show="emoji" @click.stop>
        <a class="emoji-item" v-for="i in 24" @click="chooseEmoji">
          <img :src='"http://opq9z7jxu.bkt.clouddn.com/" + i + ".gif"' />
        </a>
        <a class="emoji-item" v-for="j in 5" @click="chooseEmoji">
          <img :src='"http://opq9z7jxu.bkt.clouddn.com/" + (25 +j) + ".jpg"' />
        </a>
      </div>
      <button class="x-btn">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      emoji: false,
      comment: ''
    }
  },
  methods: {
    changeComment (e) {
      this.comment = e.target.innerHTML
    },

    chooseEmoji (e) {
      this.editInsert(this.$refs.commentEdit, e.target.parentNode.innerHTML)
      this.emoji = !this.emoji
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
    }
  },
  mounted () {
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
    padding: 3px 8px 5px;
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
    display: none;
    content: attr(data-comment);
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #a0a1a7;
  }

  .comment-control {
    position: relative;
    padding: 8px 0px;
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
</style>

<style>
  .comment-edit img {
    display: inline-block!important;
    max-width: 200px!important;
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
</style>
