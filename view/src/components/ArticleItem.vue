<template>
  <article class="article-item">
    <router-link :to="{path: '/detail', query: {'id': item._id}}">
      <h1 class="article-title" :title="item.name">{{item.name}}</h1>
    </router-link>
    <section class="article-content">
      <p>{{ item.content}}</p>
    </section>
    <footer class="article-footer">
      <div class="article-des">
        <span>goodboy · </span>
        <span class="time" :data-time="realTime">{{ time }}</span>
      </div>
    </footer>
  </article>
</template>

<script>
import Moment from 'moment'
export default {
  props: ['item'],
  computed: {
    time () {
      Moment.locale('zh-cn')
      return Moment(this.item.time).fromNow()
    },
    realTime () {
      return Moment(this.item.time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style scoped>
  .article-item {
    /*cursor: pointer;*/
    margin-bottom: 40px;
  }

  .article-title{
    font-size: 20px;
    line-height: 1.5;
    font-weight: 600;
    margin: 0;
    overflow: hidden;
    max-height: 60px;
    color: #333;
    transition: color 0.2s ease;
  }

  .article-content {
    margin: 10px 0;
    font-size: 16px;
    line-height: 2;
    max-height: 90px;
    overflow: hidden;
    color: #666;
  }

  .article-des {
    position: relative;
    height: 21px;
    overflow: hidden;
  }

  .time {
    display: inline-block;
    transform: translate3d(0, 0, 0);
    transition: transform 0.5s ease-out;
    line-height: 21px;
  }

  .time::after {
    content: attr(data-time);
    position: absolute;
    width: 150px;
    top: 0;
    left: 0px;
    transform: translate3d(0, -30px, 0);
    transition: transform 0.5s ease-out;
  }

  .article-item:hover .article-title {
    color: rgba(0, 0, 0, 1);
  }

  .article-item:hover .time {
    transform: translate3d(0, 30px, 0);
  }

  /*.article-item:hover .time::after {
    transform: translate3d(0, 0, 0);
  }*/

  @media screen and (max-width: 800px) {
    .article-content {
      font-size: 14px;
    }
  }
</style>
