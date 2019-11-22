export default {
  data () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  },
  created () {
    this.hello()
  },
  mounted () {

  },
  methods: {
    hello: function () {
    //   console.log('hello from mixin!')
    }
  }
}
