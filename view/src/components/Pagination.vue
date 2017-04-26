<template>
  <ul class="x-pagination">
    <li class="pre" v-show="this.current > 1" @click="changePage(current - 1)">pre</li>
    <p>Page {{ this.current }} of {{ this.allPages }}</p>
    <li class="next" v-show="this.current < this.allPages" @click="changePage(current + 1)">next</li>
  </ul>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    allPages: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage (page) {
      this.$emit('onChangePage', page)
    }
  }
}
</script>

<style scoped>
.x-pagination {
  position: relative;
  margin: 10px 0;
  height: 50px;
  text-align: center;
  line-height: 35px;
  color: #9EABB3;
}

.x-pagination li {
  position: absolute;
  cursor: pointer;
  display: inline-block;
  padding: 0 15px;
  border: #bfc8cd 1px solid;
  text-decoration: none;
  border-radius: 4px;
  color: #9EABB3;
  line-height: 35px;
  transition: border 0.3s ease;
  top: 0;
  z-index: 2;
  min-width: 80px;
  user-select: none;
}

.x-pagination li:hover {
  color: #889093;
  border-color: #98a0a4;
}

.pre {
  left: 0;
}

.next {
  right: 0;
}
</style>
