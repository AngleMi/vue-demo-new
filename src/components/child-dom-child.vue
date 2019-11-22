<template>
    <div>
        <p>我是子组件的子组件,我是由父组件传过来的值bar:{{bar}}</p>
        <button @click="transData">我要向父组件传值</button>
    </div>
</template>
<script>
export default {
  name: 'childDomChild',
  props: ['bar'],
  inheritAttrs: false,
  methods: {
    transData () {
      this.$emit('updateData', 11)
    }
  }
}
</script>
