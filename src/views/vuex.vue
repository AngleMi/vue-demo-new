<template>
  <div>
    <h1>vuex学习</h1>
    <p>{{count}}</p>
    <p>{{doneTodos}}</p>
    <p>{{doneTodosCount}}</p>
    <button @click="add">+</button>
    <button @click="dec">-</button>
    <button id="download-button" data-files="urls">Download</button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// import multiDownload from 'multi-download'
import download from 'downloadjs'
import { setTimeout } from 'timers'
export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doneTodos', 'doneTodosCount', 'getTodoById'])
    // doneTodosCount () {
    //   return this.$store.getters.doneTodos
    // },
    // doneTodosLength () {
    //   return this.$store.getters.doneTodosCount
    // },
    // getTodoById () {
    //   return this.$store.getters.getTodoById(2)
    // }
  },
  data () {
    return {
      urls: ['http://dawn.shareurl.facethink.com/vegas-dev-3/vegas/imageAnnotation/%E6%A0%87%E7%AD%BE%E6%B5%8B%E8%AF%95/%E6%A0%87%E7%AD%BE%E6%B5%8B%E8%AF%95.json?Signature=1H%2BvLpWw6wM4jfmgMWLFc2OSht0%3D&AWSAccessKeyId=3QO8TW7G59ES77LY8BPH&Expires=1628266849.json',
        'http://dawn.shareurl.facethink.com/vegas-dev-3/vegas/speechRecording/%E6%96%87%E5%8D%9A%E6%B5%8B%E8%AF%951/%E6%96%87%E5%8D%9A%E6%B5%8B%E8%AF%951.json?Signature=x0TtcomnL4IkxumGD74dHL7rLxQ%3D&AWSAccessKeyId=3QO8TW7G59ES77LY8BPH&Expires=1628266853.json']
    }
  },
  methods: {
    ...mapMutations(['increment', 'decrement']),
    ...mapActions(['incrementAsync']),

    add () {
      // this.$store.commit('increment')
      // this.$store.commit('increment', 10)
      // this.$store.commit('increment', { amount: 10 })
      // this.increment({ amount: 10 })
      // this.$store.dispatch('incrementAsync', { amount: 10 })
      this.incrementAsync({ amount: 10 })
    },
    dec () {
      // this.$store.commit('decrement')
      this.decrement()
    },
    timeout (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done')
      })
    }

  },
  mounted () {
    // let arr = ['a', 'b', 'c']
    // let iter = arr[Symbol.iterator]()
    // console.log(iter.next())
    // console.log(iter.next())
    // console.log(iter.next())
    // console.log(iter.next())

    // let es6 = {
    //   edition: 6,
    //   committee: 'TC39',
    //   standard: 'ECMA-262'
    // }
    // console.log(Object.keys(es6))
    // console.log(Object.values(es6))
    // for (let key of Object.keys(es6)) {
    //   console.log(key + ':' + es6[key])
    // }

    // function * helloWorldGenerator () {
    //   yield 'hello'
    //   yield 'world'
    //   return 'ending'
    // }
    // const hw = helloWorldGenerator()
    // console.log(hw.next())
    // function * f () {
    //   console.log('执行了')
    // }
    // var generator = f()

    // generator.next()

    // var arr = [1, [[2, 3], 4], [5, 6]]
    // var flat = function * (a) {
    //   var length = a.length
    //   for (var i = 0; i < length; i++) {
    //     var item = a[i]
    //     if (typeof item !== 'number') {
    //       yield * flat(item)
    //     } else {
    //       yield item
    //     }
    //   }
    // }
    // for (var f of flat(arr)) {
    //   // console.log(f)
    // }
    // this.timeout(100).then((value) => {
    //   console.log(value)
    // })
    // let promise = new Promise((resolve, reject) => {
    //   console.log('Promise')
    //   resolve()
    // })
    // promise.then(() => {
    //   console.log('resolved.')
    // })
    // console.log('Hi!')

    // const someAsyncTing = () => {
    //   return new Promise((resolve, reject) => {
    //     // resolve( + 2)
    //     reject(new Error('cuowu'))
    //   })
    // }
    // someAsyncTing().catch((err) => {
    //   console.log('oh,no', err)
    // })

    // const p1 = new Promise((resolve, reject) => {
    //   resolve('Hello')
    // })
    //   .then(result => result)
    //   .catch(e => e)
    // const p2 = new Promise((resolve, reject) => {
    //   throw new Error('报错了')
    // })
    //   .then(result => result)
    //   .catch(e => e)
    // Promise.all([p1, p2])
    //   .then(result => console.log(result))
    //   .catch(e => console.log(e))

    document.querySelector('#download-button').addEventListener('click', event => {
      // const files = event.target.dataset.files.split(' ')
      // multiDownload(files, {
      //   rename: ({ url, index, urls }) => 'New name.pdf'
      // })
      for (let i = 0; i < this.urls.length; i += 1) {
        download(this.urls[i])
      }
    })
    // console.log(this.getTodoById(2))
    // function log (x, y = 'world') {
    //   console.log(x, y)
    // }
    // log('hello')
    // log('hello', 'china')
    // log('hello', '')
    // function Point (x = 0, y = 0) {
    //   this.x = x
    //   this.y = y
    // }
    // const p = new Point()
    // console.log(p)
    // function foo ({ x, y = 5 }) {
    //   console.log(x, y)
    // }
    // foo({})
    // foo({ x: 1 })
    // foo({ x: 1, y: 2 })
    // foo()
    // function foo ({ x, y = 5 } = {}) {
    //   console.log(x, y)
    // }
    // foo()
    // function fetch (url, { body = '', method = 'GET', header = {} }) {
    //   console.log(method)
    // }
    // let thenable = {
    //   then: function (resolve, reject) {
    //     resolve(42)
    //   }
    // }
    // let p1 = Promise.resolve(thenable)
    // // console.log(p1)
    // p1.then((value) => {
    //   // console.log(value)
    // })
    // const p = Promise.resolve()
    // console.log(p)
    //   const thenable = {
    //     then (resolve, reject) {
    //       reject('出错了')
    //     }
    //   }
    //   Promise.reject(thenable)
    //     .catch(e => {
    //       console.log(e === thenable)
    //     })
    // const preloadImage = function (path) {
    //   return new Promise(function (resolve, reject) {
    //     const image = new Image()
    //     image.onload = resolve
    //     image.onerror = reject
    //     image.src = path
    //   })
    // }
    // const f = () => console.log('now');
    // (async () => f())()
    // console.log('next')
  }
}
</script>
