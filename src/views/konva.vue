<template>
    <div id="container">
      <!-- <img src="../assets/demo.png" alt=""> -->
    </div>
    <!-- <i-row class="image-annotation-tool">
        <i-col span="3">
            <div class="inspect-layer">
              左侧
            </div>
        </i-col>
        <i-col span="17">
            <div class="inspect-element">
              <img src="../assets/demo.png" alt="" height="700px">
            </div>
        </i-col>
        <i-col span="4">
             <div class="inspect-labels">
                右侧
            </div>
        </i-col>
    </i-row> -->
</template>
<script>
import Konva from 'konva'
// const stage = new Konva.Stage({
//   container: 'container',
//   width: 578,
//   height: 200
// })
// const layer = new Konva.Layer()
// const text = new Konva.Text({
//   x: 10,
//   y: 10,
//   fontFamily: 'Calibri',
//   fontSize: 24,
//   text: '',
//   fill: 'black'
// })
// const sources = {
//   tu1: '../assets/ps4.jpg',
//   tu2: '../assets/ps6.jpg'
// }
export default {
  methods: {
    // initKnova () {
    //   const stage = new Konva.Stage({
    //     container: 'container',
    //     width: 500,
    //     height: 500
    //   })
    //   const layer = new Konva.Layer()
    //   const circle = new Konva.Circle({
    //     x: stage.width() / 2,
    //     y: stage.height() / 2,
    //     radius: 70,
    //     fill: 'red',
    //     stroke: 'black',
    //     strokeWidth: 2
    //   })
    //   layer.add(circle)
    //   stage.add(layer)
    // },
    // rotationRect () {
    //   const stage = new Konva.Stage({
    //     container: 'container',
    //     width: 600,
    //     height: 600
    //   })
    //   const layer = new Konva.Layer()
    //   const rect = new Konva.Rect({
    //     x: 0,
    //     y: 0,
    //     width: 100,
    //     height: 100,
    //     strokeWidth: 2,
    //     stroke: 'black'
    //   })
    //   const rotatePoint = ({ x, y }, rad) => {
    //     const rcos = Math.cos(rad)
    //     const rsin = Math.sin(rad)

    //     return { x: x * rcos - y * rsin, y: y * rcos + x * rsin }
    //   }
    //   function rotateAroundCenter (node, rotation) {
    //     const topLeft = { x: -node.width() / 2, y: -node.height() / 2 }
    //     const current = rotatePoint(topLeft, Konva.getAngle(node.rotation()))
    //     console.log(Konva.getAngle(node.rotation()))
    //     const rotated = rotatePoint(topLeft, Konva.getAngle(rotation))
    //     const dx = rotated.x - current.x
    //     const dy = rotated.y - current.y
    //     node.rotation(rotation)
    //     node.x(node.x() + dx)
    //     node.y(node.y() + dy)
    //   }
    //   rotateAroundCenter(rect, 30)
    //   layer.add(rect)
    //   stage.add(layer)
    // },

    // writeMessage (message) {
    //   text.text(message)
    //   layer.draw()
    // },
    // loadImages (sources, callback) {
    //   let images = {}
    //   let loadedImages = 0
    //   let numImages = 0
    //   for (let key in sources) {
    //     console.log(key)
    //     numImages++
    //   }
    //   for (let key in sources) {
    //     images[key] = new Image()
    //     images[key].onload = function () {
    //       if (++loadedImages >= numImages) {
    //         callback(images)
    //       }
    //     }
    //     images[key].src = sources[key]
    //   }
    // },
    // buildStage (images) {
    //   const tu1 = new Konva.Image({
    //     image: images.tu1,
    //     x: 120,
    //     y: 50
    //   })
    //   const tu2 = new Konva.Image({
    //     image: images.tu2,
    //     x: 280,
    //     y: 30
    //   })
    //   tu1.on('mouseover', () => {
    //     this.writeMessage('mouseover tu1')
    //   })
    //   tu1.on('mouseout', () => {
    //     this.writeMessage('')
    //   })
    //   tu2.on('mouseover', () => {
    //     this.writeMessage('mouseover tu2')
    //   })
    //   tu2.on('mouseout', () => {
    //     this.writeMessage('')
    //   })
    //   tu1.cache()
    //   tu2.drawHitFromCache()
    //   layer.add(tu1)
    //   layer.add(tu2)
    //   layer.add(text)
    //   stage.add(layer)
    // }
    initImage () {
      function writeMessage (message) {
        text.text(message)
        layer.draw()
      }
      function loadImages (sources, callback) {
        var images = {}
        var loadedImages = 2
        var numImages = 2
        // for (let key in sources) {
        //   numImages++
        // }
        for (let key in sources) {
          images[key] = new Image()
          images[key].src = sources[key]
          // console.log(images)
          images[key].onload = function () {
            if (++loadedImages >= numImages) {
              // console.log(111)
              callback(images)
            }
          }
        }
      }
      function buildStage (images) {
        // console.log(images)
        var monkey = new Konva.Image({
          image: images.monkey,
          x: 120,
          y: 50
        })

        var lion = new Konva.Image({
          image: images.lion,
          x: 280,
          y: 30
        })

        monkey.on('mouseover', function () {
          writeMessage('mouseover monkey')
        })

        monkey.on('mouseout', function () {
          writeMessage('')
        })

        lion.on('mouseover', function () {
          writeMessage('mouseover lion')
        })

        lion.on('mouseout', function () {
          writeMessage('')
        })

        lion.cache()
        lion.drawHitFromCache()

        layer.add(monkey)
        layer.add(lion)
        layer.add(text)
        stage.add(layer)
      }
      var stage = new Konva.Stage({
        container: 'container',
        width: 578,
        height: 200
      })

      var layer = new Konva.Layer()

      var text = new Konva.Text({
        x: 10,
        y: 10,
        fontFamily: 'Calibri',
        fontSize: 24,
        text: '',
        fill: 'black'
      })

      var sources = {
        lion: '../assets/ps4.jpg',
        monkey: '../assets/ps6.jpg'
      }

      loadImages(sources, buildStage)
    },
    drawRect () {
      const width = window.innerWidth
      const height = window.innerHeight
      const stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      })
      const layer = new Konva.Layer()
      stage.add(layer)
      const rect = new Konva.Rect({
        x: 250,
        y: 100,
        width: 150,
        height: 90,
        name: 'rect',
        draggable: true,
        stroke: 'blue',
        strokeScaleEnabled: false
      })
      layer.add(rect)
      layer.draw()
      stage.on('click tap', function (e) {
        if (e.target === stage) {
          rect.fill('')
          // rect.stroke('blue')
          stage.find('Transformer').destroy()
          layer.draw()
          return false
        }
        if (!e.target.hasName('rect')) {
          return false
        }
        rect.fill('rgba(246,231,82,0.3)')
        // rect.stroke('rgba(246,231,82,0.3)')
        stage.find('Transformer').destroy()
        const tr = new Konva.Transformer({
          // rotateEnabled: false,
          // borderEnabled: false,
          rotateAnchorOffset: 20,
          anchorFill: 'white',
          anchorStroke: 'rgb(246,231,82)',
          anchorSize: 5
        })
        layer.add(tr)
        tr.attachTo(e.target)
        layer.draw()
      })
    },
    zINdex () {
      var width = window.innerWidth
      var height = window.innerHeight

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      })

      var layer = new Konva.Layer()
      stage.add(layer)

      // create first group with two shapes
      var group1 = new Konva.Group()
      layer.add(group1)

      var blackRect = new Konva.Rect({
        x: 20,
        y: 20,
        fill: 'black',
        width: 100,
        height: 100
      })
      group1.add(blackRect)

      var redCircle = new Konva.Circle({
        x: 70,
        y: 70,
        fill: 'red',
        radius: 30
      })
      group1.add(redCircle)

      // now the red circle on on top of black rectangle
      // we can change its zIndex with:
      redCircle.zIndex(0)

      // if we what to move it back to the top we can change its zIndex again
      // or we can change zIndex of black rectangle:
      blackRect.zIndex(0)
      // after that zIndex of red circle will be changed back to 1:
      // console.log('red circle index: ' + redCircle.zIndex())

      // crete second group with one shape
      var group2 = new Konva.Group()
      layer.add(group2)

      var greenRect = new Konva.Rect({
        x: 70,
        y: 70,
        width: 100,
        height: 100,
        fill: 'green'
      })
      group2.add(greenRect)

      layer.draw()
      // console.log('greenRect  index: ' + greenRect.zIndex())
    },
    toJson () {
      var width = window.innerWidth
      var height = window.innerHeight

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height
      })

      var layer = new Konva.Layer()

      var hexagon = new Konva.RegularPolygon({
        x: width / 2,
        y: height / 2,
        sides: 6,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      })

      // add the shape to the layer
      layer.add(hexagon)

      // add the layer to the stage
      stage.add(layer)

      // save stage as a json string
      // var json = stage.toJSON()

      // console.log(json)
    }
  },
  mounted () {
    // this.rotatinRect()
    // this.initImage()
    // this.loadImages(sources, this.buildStage)
    this.drawRect()
    // this.zINdex()
    // this.toJson()
  }
}
</script>
<style lang="less">
.image-annotation-tool{
    // border: 1px solid #CACBCB;
    .inspect-layer,
    .inspect-labels{
        background: #E9E9E9;
        height: 700px;
        overflow: auto;
    }
    .inspect-labels{
        border-left: 1px solid #CACBCB;
        padding: 4px;
    }
    .inspect-layer{
        border-right: 1px solid #CACBCB;
        padding-right: 2px;
    }
    .inspect-element{
        cursor: grab;
    }
}
</style>
