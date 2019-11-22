<template>
    <div>
        <h3>练习</h3>
        <!-- <div id="myDiv"></div> -->
        <div class="video">
          <video id="my-video" height="216"></video>
        </div>
    </div>
</template>
<script>
// import flvjs from 'flv.js/dist/flv.js'
import 'pixi'
import 'p2'
import Phaser from 'phaser'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    // console.log(flvjs.isSupported())
    // const myVideo = document.getElementById('my-video')
    // var flvPlayer = flvjs.createPlayer({
    //   type: 'mp4',
    //   // isLive: true,
    //   cors: true,
    //   url: 'http://dawn.shareurl.facethink.com/vegas-dev/wjw%2Fgrade6_1_30.mp4?AWSAccessKeyId=3QO8TW7G59ES77LY8BPH&Expires=1601089897&Signature=B2zC7jYX2DClRFH01L0RHC4UCV8%3D'
    // })
    // flvPlayer.attachMediaElement(myVideo)
    // flvPlayer.load()
    // flvPlayer.play()
    // setTimeout(function () { flvPlayer.play() }, 0)

    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update })

    function preload () {
      game.load.image('pic', 'assets/pics/thalion-rain.png')
      game.load.video('space', 'assets/video/alpha-webm.webm')
      game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml')
    }

    var video
    var text

    function create () {
      //  This only works in Chrome
      //  No other browser supports webm files with alpha transparency (yet)

      var pic = game.add.image(400, 300, 'pic')
      pic.anchor.set(0.5)
      pic.scale.set(4)
      pic.smoothed = false

      text = game.add.bitmapText(400, 300, 'desyrel', 'Phaser\nAlpha Videos', 64)
      text.anchor.set(0.5)
      text.align = 'center'

      video = game.add.video('space')

      video.play(true)

      video.addToWorld(400, 300, 0.5, 0.5)
    }

    function update () {
      text.text = 'Phaser kicking\nAlpha Video Channels\n' + Math.round(video.progress * 100) + '%'
    }
  }
}
</script>
<style>
.video{
  /* margin: 0 auto; */
  text-align: center
}
</style>
