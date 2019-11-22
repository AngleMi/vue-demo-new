<template>
    <div class="video-container">
      <div>
        <span>视频1播放进度:{{currentTime1}}</span>
        <span style="padding-left:10px;">视频2播放进度:{{currentTime2}}</span>
        <span style="padding-left:10px;">进度差:{{currentTime1-currentTime2}}</span>
      </div>
      <div class="class-record">
          <video ref="video1" class="video1">
              <source :src="video1Url" type="video/mp4"/>
          </video>
      </div>
      <div class="ai-record">
          <video ref="video2" class="video2">
              <source :src="data[0].url" type="video/mp4"/>
          </video>
      </div>
    <div class="video-control">
        <div class="control-left">
             <!-- 播放暂停键 -->
            <div v-if="videoState.play" class="control-btn playbtn" @click="pause('btn')">
                <Icon type="md-pause" />
            </div>
            <div v-else class="control-btn playbtn" @click="play('btn')">
                <Icon type="md-play" />
            </div>
        </div>
        <div class="control-right">
            <!-- 进度条 -->
            <div
               class="video-control-bg"
               @mousedown="handlePrograssDown"
               @mousemove="handlePrograssMove"
               @mouseup="handlePrograssUp"
            >
                <div
                    class="video_control-bg-outside"
                    ref="video_control-bg-outside"
                >
                    <span
                        class="video_control-bg-inside"
                        ref="video_control-bg-inside"
                    ></span>
                    <span
                        class="video_control-bg-inside-point"
                        ref="video_control-bg-inside-point"
                    ></span>
                </div>
            </div>
            <!-- 时间 -->
            <div class="video_control-time">
                <span>{{ currentTime ? currentTime : "00:00"}}</span>/<span>{{duration ? duration : "00:00"}}</span>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      videoState: {
        play: false, // 播放状态
        distance: 0, // 移动距离
        downState: false, // 鼠标点击进度条
        playState: false,
        leftInit: 0 // 当前进度初始偏移量
      },
      videoDom1: null, // video1
      videoDom2: null, // vide2
      videoProOut: null, // 视频总进度条
      videoPro: null, // 视频进度条
      videoPoi: null, // 视频进度点
      duration: 0, // 视频总时长
      currentTime: 0, // 视频当前播放时长
      processWidth: 0, // 视频进度条总长度
      currentTime1: 0,
      currentTime2: 0,
      status: '',
      video1Url: require('../assets/phoenix_class.mp4'),
      data: [
        {
          key: 1,
          url: require('../assets/video_demo.mp4'),
          duration: 416,
          next: 2
        }, {
          key: 2,
          url: require('../assets/phoenix_class.mp4'),
          duration: 1803,
          next: 3
        },
        {
          key: 3,
          url: require('../assets/demo1.mp4'),
          duration: 132
        }
      ]
    }
  },
  mounted () {
    this.videoDom1 = this.$refs['video1']
    this.videoDom2 = this.$refs['video2']
    this.videoProOut = this.$refs['video_control-bg-outside']
    this.videoPro = this.$refs['video_control-bg-inside']
    this.videoPoi = this.$refs['video_control-bg-inside-point']
    this.processWidth = this.videoProOut.clientWidth
    this.videoState.leftInit = this.getOffset(this.videoProOut).left
    this.initMedaData()
  },
  methods: {
    initMedaData () { // 初始化video相关事件
      this.videoDom1.addEventListener('loadedmetadata', () => { // 获取视频总时长
        this.status = this.status === 'waveform-ready' ? 'allready' : 'ready'
        if (this.status === 'allready' || this.status === 'ready') {
          this.duration = this.timeTranslate(this.videoDom1.duration)
        }
      })
      this.videoDom1.addEventListener('timeupdate', () => { // 监听视频播放过程中的时间
        const percentage = 100 * this.videoDom1.currentTime / this.videoDom1.duration
        this.videoPro.style.width = percentage + '%'
        this.videoPoi.style.left = (percentage - 1) + '%'
        this.currentTime1 = this.videoDom1.currentTime
        // console.log(this.currentTime1)
        // if (Math.floor(this.currentTime1) === 10) {
        //   console.log('zhixing??')
        //   this.videoDom2.src = this.video1Url
        // }

        this.currentTime = this.timeTranslate(this.videoDom1.currentTime)
      })
      this.videoDom1.addEventListener('ended', () => { // 监听结束播放事件
        this.videoState.play = false
      })
      this.videoDom2.addEventListener('loadedmetadata', () => { // 获取视频总时长
        this.status = this.status === 'ready' ? 'allready' : 'waveform-ready'
      })
      this.videoDom2.addEventListener('timeupdate', () => { // 监听视频播放过程中的时间
        this.currentTime2 = this.videoDom2.currentTime
      })
    },
    play (flag) { // 播放按钮事件
      if (flag) {
        this.videoState.playState = true
      }
      this.videoState.play = true
      this.videoDom1.play()
      this.videoDom2.play()
    },
    pause (flag) { // 暂停按钮事件
      if (flag) {
        this.videoState.playState = false
      }
      this.videoState.play = false
      this.videoDom1.pause()
      this.videoDom2.pause()
    },
    handlePrograssDown (ev) { // 监听点击进度条事件，方便获取初始点击的位置
      // 视频暂停
      this.videoState.downState = true // 按下鼠标标志
      this.videoState.distance = ev.clientX - this.videoState.leftInit
    },
    handlePrograssMove (ev) { // 监听移动进度条事件，同步播放相关事件
      if (!this.videoState.downState) return
      let disX = ev.clientX - this.videoState.leftInit
      if (disX > this.processWidth) {
        disX = this.processWidth
      }
      if (disX < 0) {
        disX = 0
      }
      this.videoState.distance = disX
      this.videoDom1.currentTime = this.videoState.distance / this.processWidth * this.videoDom1.duration
      this.videoDom2.currentTime = this.videoDom1.currentTime
    },
    handlePrograssUp () { // 松开鼠标，播放当前进度条视频
      this.videoState.downState = false
      // 视频播放
      this.videoDom1.currentTime = this.videoState.distance / this.processWidth * this.videoDom1.duration
      this.videoDom2.currentTime = this.videoDom1.currentTime
      this.currentTime = this.timeTranslate(this.videoDom1.currentTime)
      if (this.videoState.playState) {
        this.play()
      }
    },
    timeTranslate (t) { // 时间转化
      let m = Math.floor(t / 60)
      m < 10 && (m = '0' + m)
      return m + ':' + (t % 60 / 100).toFixed(2).slice(-2)
    },
    getOffset (node, offset) { // 获取当前屏幕下进度条的左偏移量和又偏移量
      if (!offset) {
        offset = {}
        offset.left = 0
        offset.top = 0
      }
      if (node === document.body || node === null) {
        return offset
      }
      offset.top += node.offsetTop
      offset.left += node.offsetLeft
      return this.getOffset(node.offsetParent, offset)
    }
  }

}
</script>
<style lang="less">
.video-container{
    margin-top:50px;
    text-align: center;
    .class-record {
            display: inline-block;
        }
    .ai-record{
        margin-left: 20px;
        display: inline-block;
    }
    .video1,.video2{
        width:320px;
        height:176px;
    }
    .video-control{
        width:660px;
        margin:0 auto;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: rgba(0, 0, 0, .5);
        .control-left{
            margin-left:10px;
            width:20px;
            height:20px;
            border-radius: 100%;
            border:1px solid #aaa;
            .playbtn{
                cursor: pointer;
            }
        }
        .control-right{
            height: 20px;
            margin-left:5px;
            display: flex;
            .video-control-bg {
                width:500px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 10px;
                .video_control-bg-outside{
                    width: 100%;
                    height: 5px;
                    border-radius: 2.5px;
                    background-color: #aaa;
                    position: relative;
                    cursor: pointer;
                    .video_control-bg-inside{
                        position: absolute;
                        display: inline-block;
                        width: 0;
                        height: 100%;
                        border-radius: 2.5px;
                        left: 0;
                        top: 0;
                        background-color: #fff;
                        transition: all 0.2s;
                    }
                    .video_control-bg-inside-point{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background-color: #fff;
                        border-radius: 50%;
                        position: absolute;
                        top: -2.5px;
                        left: -1%;
                        transition: all 0.2s;
                    }
                }
            }
            .video_control-time{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                color:#fff;
            }
        }
    }
}

</style>
