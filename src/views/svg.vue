<template>
  <div>
    <svg width="100%" height="800px" focusable="true" tabindex="-1" id="svg1">
      <!-- <g v-for="(item,index) in pathArray" :key="index">
        <path v-if="item" :d="item" stroke="red" stroke-width="1" fill="none" />
      </g> -->
      <path v-if="basepath" :d="basepath" stroke="red" stroke-width="1" fill="none" />
      <g v-for="(item,index) in selectedPath" :key="index">
        <rect :x="item.x-2.5" :y="item.y-2.5" width="5" height="5" style="fill:white;stroke:blue; stroke-width='1'" />
      </g>
    </svg>
  </div>
</template>
<script>

export default {
  data () {
    return {
      selectedPath: [],
      pathArray: []
    }
  },
  watch: {
  },
  computed: {
    basepath () {
      if (!this.selectedPath || this.selectedPath.length === 0) {
        return false
      }
      let d = 'M'
      this.selectedPath.forEach((tar, index) => {
        if ((tar.flag === true)) {
          d = 'M'
        }
        d += tar.x
        d += ' '
        d += tar.y
        d += ' '
        if (index === this.selectedPath.length - 1) {
          d += 'Z'
        } else {
          d += 'L'
        }
      })
      //   console.log(d)
      return d
    }
  },
  methods: {
    drawPolygon () {
      const svg = document.getElementById('svg1')
      svg.addEventListener('mousedown', this.draw, false)
      svg.addEventListener('dblclick', this.draw, false)
    },

    draw (e) {
      let flag = false
      if (e.type === 'mousedown') {
        flag = false
      } else if (e.type === 'dblclick') {
        flag = true
      }
      const obj = {}
      obj.x = e.layerX
      obj.y = e.layerY
      obj.flag = flag
      this.selectedPath.push(obj)
    //   if (e.type === 'dblclick') {
    //     // this.selectedPath.splice(this.selectedPath.length - 3, 2)
    //   }
    }
  },
  mounted () {
    this.drawPolygon()
  }
}
</script>
