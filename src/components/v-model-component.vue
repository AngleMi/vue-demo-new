<template>
    <div>
        <i-input
            v-model="inputValue"
        />
    </div>
</template>
<script>
export default {
  name: 'vModelComponent',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data () {
    return {
      inputValue: JSON.parse(JSON.stringify(this.value))
    }
  },
  watch: {
    value (newVal) {
      this.inputValue = newVal
    },
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {

  }
}
</script>
