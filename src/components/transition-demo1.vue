<template>
  <div>
    <button @click="show=!show">Toggle</button>
    <transition appear>
      <p v-if="show">hello</p>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>
<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to .fade-leave-active below version 2.1.8 {
  /* opacity: 0; */
/* }  */
</style>
