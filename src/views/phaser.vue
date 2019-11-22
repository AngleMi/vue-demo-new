<template>
    <div>

    </div>
</template>
<script>
import 'pixi'
import 'p2'
import Phaser from 'phaser'
export default {
  mounted () {
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create })

    function preload () {
      game.add.text(100, 100, 'Loading videos ...', { font: '65px Arial', fill: '#ff0044' })

      game.load.video('liquid', require('../assets/mov_bbb.mp4'))
      game.load.video('space', require('../assets/mov_bbb.mp4'))
    }

    var video1
    var video2

    function create () {
      video1 = game.add.video('space')
      video2 = game.add.video('liquid')

      video1.play(true)
      video2.play(true)

      //  x, y, anchor x, anchor y, scale x, scale y
      video1.addToWorld(400, 300, 0.5, 0.5)

      video2.addToWorld(780, 580, 1, 1, 0.5, 0.5)
    }
  }
}
</script>
<style lang="">

</style>
