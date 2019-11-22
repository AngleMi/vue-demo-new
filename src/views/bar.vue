<template>
    <div>
        <svg
            id="svg1"
            width="100%"
            height="800px"
            focusable="true"
            tabindex="-1"
            @mousedown="draw"
            @mousemove="move"
            @mouseup="judgeDone"
        >
            <path v-for="path in graphs" :key="path.index" :d="basepath(path, path.index)" stroke="red" stroke-width="1" fill="none" />
            <g v-for="(item,index) in activePath" :key="index+'a'">
                <rect :x="item.x-2" :y="item.y-2" width="4" height="4" style="fill:white;stroke:blue; stroke-width='1'" />
            </g>
        </svg>
    </div>
</template>
<script>
// import Graphics from './pointInPolygon.js'
export default {
  filters: {

  },
  data () {
    return {
      pathArray: [],
      graphs: [],
      done: true,
      activeIndex: null
    }
  },
  computed: {
    activePath () {
      const path = this.graphs.find(item => item.index === this.activeIndex)
      return path || []
    }
  },
  watch: {
    pathArray (val) {
      // console.log(val)
      if (val.length === 0) return
      const len = this.graphs.length
      const index = this.graphs.findIndex(item => item.index === val.index)
      if (len === 0 || index < 0) {
        this.graphs.push(val)
      } else {
        this.graphs.splice(index, 1, val)
      }
      // console.log(this.graphs)
    }
  },
  methods: {
    basepath (pathArray, current) {
      if (!pathArray || pathArray.length === 0) {
        return ''
      }
      let d = 'M'
      const { length } = pathArray
      pathArray.forEach((tar, index) => {
        d += tar.x
        d += ' '
        d += tar.y
        d += ' '
        if (index === length - 1 && (this.done || current !== this.activeIndex)) {
          d += 'Z'
        } else {
          d += 'L'
        }
      })
      return d.replace(/L(Z)?$/, '$1')
    },
    draw (e) {
      if (this.done) {
        this.pathArray.index = this.pathArray.index !== undefined ? this.pathArray.index + 1 : 0
        this.activeIndex = this.pathArray.index
        this.done = false
      }
      const obj = {}
      obj.x = e.offsetX
      obj.y = e.offsetY
      obj.isPoint = true
      const { length } = this.pathArray
      const last = this.pathArray[length - 1]
      if (last && !last.isPoint) {
        this.pathArray.splice(length - 1, 1, obj)
      } else {
        this.pathArray.push(obj)
      }
    },
    move (e) {
      if (this.done) return
      const len = this.pathArray.length
      const obj = {}
      obj.x = e.offsetX
      obj.y = e.offsetY
      obj.isPoint = false
      const last = this.pathArray[len - 1]
      const index = last && last.isPoint ? len : len - 1
      this.pathArray.splice(index, 1, obj)
    },
    judgeDone () {
      const { length } = this.pathArray
      this.done = length >= 4 && this.isNearing(this.pathArray)
      if (this.done) {
        this.pathArray.splice(length - 1, 1)
        // console.log(this.pathArray)
        this.pathArray = []
        this.pathArray.index = this.activeIndex
      }
    },
    isNearing (points) {
      const len = points.length
      const first = points[0]
      const last = points[len - 1]
      const sx = (last.x - first.x) ** 2
      const sy = (last.y - first.y) ** 2
      const isNear = Math.sqrt(sx + sy) < 5
      return isNear
    }
  },
  mounted () {
    // const arr = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }]
    // const n = arr.length
    // const point = { x: 20, y: 20 }
    // console.log(Graphics.isInside(arr, n, point))
  }
}
</script>
