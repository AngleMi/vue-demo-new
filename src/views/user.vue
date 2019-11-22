<template>
    <div>
        User{{id}}
    </div>
</template>
<script>
export default {
  props: ['id'],
  watch: {
    '$route' (to, from) {
      // const Id = this.$route.params.id
      // console.log(Id)
    }
  },
  data () {
    return {
    //   Id: null
    }
  },
  created () {
    // console.log(this.Id)
    // this.id = this.$route.params.id
    // console.log(this.id)
  },
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
    // const Id = to.params.id
    next()
    // console.log(Id)
  }
}
</script>
