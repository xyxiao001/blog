<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a, a:hover a:focus {
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
}

li {
  list-style: none;
}

#app {
  position: relative;
  font-family: Helvetica Neue For Number,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  line-height: 1.5;
  font-size: 14px;
  background: #fff;
  transition: background 1s cubic-bezier(.075,.82,.165,1);
  overflow-x: auto;
}
</style>
