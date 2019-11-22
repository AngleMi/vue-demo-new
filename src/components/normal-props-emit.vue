<template>
    <div>
        <button @click="changeTitle">{{title}}</button>
    </div>
</template>
<script>
export default {
  name: 'normalPropsEmit',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    //   buttonValue: JSON.parse(JSON.stringify(this.title))
    }
  },
  methods: {
    changeTitle () {
      this.buttonValue = 'hhahah'
      this.$emit('changeButtonValue', this.buttonValue)
    }
  }
}
</script>
