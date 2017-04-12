<template>
  <div class="">
    <p>{{ name }}</p>
    <p>{{ url }}</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      name: '',
      url: ''
    }
  },
  mounted () {
    var that = this
    this.$axios.get('/')
    .then(function (response) {
      console.log(response)
      that.name = response.data.name
      that.url = response.data.url
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
