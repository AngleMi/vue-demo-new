<template>
    <div class="video-container">
        <div>
            <span>视频1播放进度:{{ currentTime1 }}</span>
            <span style="padding-left:10px;">视频2播放进度:{{ currentTime2 }}</span>
            <span style="padding-left:10px;">进度差:{{ currentTime2 - currentTime1 }}</span>
        </div>
      <div class="class-record">
          <video ref="video1" class="video1">
              <source :src="video1Url" type="video/mp4"/>
          </video>
      </div>
      <div class="ai-record">
          <video ref="video2" class="video2">
              <source :src="videoDataList[0].url" type="video/mp4"/>
          </video>
      </div>
    <div class="video-control">
        <div class="control-left">
             <!-- 播放暂停键 -->
            <div v-if="videoOptions.play" class="control-btn playbtn" @click="pause">
                <Icon type="md-pause" />
            </div>
            <div v-else class="control-btn playbtn" @click="play">
                <Icon type="md-play" />
            </div>
        </div>
        <div class="control-right">
            <!-- 进度条 -->
            <div class="video-control-bg" ref="video-control-bg">
                <div
                    v-for="(item,index) in videoDataList"
                    :key="index"
                    class="video_control-bg-outside"
                    :style="{ width: item.width +'px'}"
                    @mousedown="handleMouseDown($event,item.width)"
                    @mousemove="handleMouseMove($event,item.id,item.width,item.actualwidth,item.duration)"
                    @mouseup="handleMouseUp($event,item.id,item.width,item.actualwidth,item.duration,item.url)"
                >
                    <div
                        class="video_control-bg-inside"
                        :style="{ width: percent + '%'}"
                    >
                    </div>
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
      video1Url: require('../assets/phoenix_class.mp4'),
      videoOptions: {
        downState: false,
        play: false,
        leftInit: 0,
        distance: 0
      },
      videoDataList: [
        {
          id: '1',
          url: require('../assets/video_demo.mp4'),
          duration: 412,
          main: true,
          nextId: '2'
        }, {
          id: '2',
          url: require('../assets/class2.mp4'),
          duration: 168,
          nextId: '3'
        },
        {
          id: '3',
          url: require('../assets/class1.mp4'),
          duration: 46
        }
      ],
      videoDom1: null,
      videoDom2: null,
      videoPro: null, // 视频进度条
      videoPoi: null, // 视频进度点
      videoCotrolBg: null,
      totalDuration: 0,
      totalWidth: 0,
      currentTime: 0,
      currentTime1: 0,
      currentTime2: 0,
      duration: 0,
      currentId: null,
      videoMap: new Map(),
      isLastVideo: false,
      percent: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.videoDom1 = this.$refs['video1']
      this.videoDom2 = this.$refs['video2']
      this.videoPro = this.$refs['video_control-bg-inside']
      this.videoPoi = this.$refs['video_control-bg-inside-point']
      this.videoCotrolBg = this.$refs['video-control-bg']
      this.totalWidth = this.videoCotrolBg.clientWidth
      this.videoOptions.leftInit = this.getOffset(this.videoCotrolBg).left
      this.initMedaData()
    })
  },
  methods: {
    initMedaData () {
      this.videoDom1.addEventListener('loadedmetadata', () => {
        this.totalDuration = this.videoDom1.duration
        this.duration = this.timeTranslate(this.totalDuration)
        let preWidth = 0
        this.videoDataList.forEach((item, index) => {
          if (index !== this.videoDataList.length - 1) {
            this.$set(item, 'width', (item.duration / this.totalDuration) * this.totalWidth)
            preWidth += item.width
          } else {
            this.$set(item, 'actualwidth', (item.duration / this.totalDuration) * this.totalWidth)
          }
          if (item.main === true) {
            this.currentId = item.id
          }
          this.videoMap.set(item.id, item)
        })
        const len = this.videoDataList.length
        this.$set(this.videoDataList[len - 1], 'width', this.totalWidth - preWidth)
      })
      this.videoDom1.addEventListener('timeupdate', () => { // 监听视频播放过程中的时间
        // this.percent = 100 * this.videoDom1.currentTime / this.videoDom1.duration
        this.currentTime1 = this.videoDom1.currentTime
        this.currentTime = this.timeTranslate(this.videoDom1.currentTime)
      })
      this.videoDom2.addEventListener('timeupdate', () => { // 监听视频播放过程中的时间
        this.currentTime2 = this.videoDom2.currentTime
      })
      this.videoDom2.addEventListener('ended', () => {
        const videoObj = this.videoMap.get(this.currentId)
        if (videoObj.nextId) {
          const nextIdVideo = this.videoMap.get(videoObj.nextId)
          this.videoDom2.src = nextIdVideo.url
          this.currentId = videoObj.nextId
          this.videoDom2.play()
        }
      })
    },
    play () {
      this.videoOptions.play = true
      this.videoDom1.play()
      if (!this.isLastVideo) {
        this.videoDom2.play()
      }
    },
    pause () {
      this.videoOptions.play = false
      this.videoDom1.pause()
      this.videoDom2.pause()
    },
    handleMouseDown (ev, width) {
      this.videoOptions.downState = true
      this.videoOptions.distance = ev.clientX - this.videoOptions.leftInit
    },
    handleMouseMove (ev, id, width, actualwidth, duration) {
      const offset = ev.offsetX
      const videoCotrolBg = this.$refs['video-control-bg']
      if (!this.videoOptions.downState) return
      let disX = ev.clientX - this.videoOptions.leftInit
      if (disX > videoCotrolBg.clientX) {
        disX = videoCotrolBg.clientX
      }
      if (disX < 0) {
        disX = 0
      }
      if (actualwidth) {
        const ratio = (actualwidth / width)
        let currentTime2 = offset * ratio * duration
        if (currentTime2 >= duration) {
          currentTime2 = duration
          this.isLastVideo = true
        }
        this.videoDom2.currentTime = currentTime2
      } else {
        this.isLastVideo = false
        const currentTime2 = (offset / width) * duration
        this.videoDom2.currentTime = currentTime2
      }
      this.videoOptions.distance = disX
      const currentTime1 = (this.videoOptions.distance / this.totalWidth) * this.videoDom1.duration
      this.videoDom1.currentTime = currentTime1
      this.currentTime = this.timeTranslate(this.videoDom1.currentTime)
    },
    handleMouseUp (ev, id, width, actualwidth, duration, url) {
      this.currentId = id
      const offset = ev.offsetX
      //   console.log(ev.layerX, 'layerX')
      //   console.log(this.videoOptions.distance)
      this.videoOptions.downState = false
      const urlsrc = this.videoDom2.src.substring(21)
      if (urlsrc !== url) {
        this.videoDom2.src = url
      }
      if (this.videoOptions.play) {
        this.play()
      }
      const currentTime1 = (this.videoOptions.distance / this.totalWidth) * this.videoDom1.duration
      if (actualwidth) {
        const ratio = (actualwidth / width)
        let currentTime2 = offset * ratio * duration
        if (currentTime2 >= duration) {
          currentTime2 = duration
          this.isLastVideo = true
        }
        this.videoDom2.currentTime = currentTime2
      } else {
        this.isLastVideo = false
        const currentTime2 = (offset / width) * duration
        console.log(currentTime2, 'currentTime2')
        this.videoDom2.currentTime = currentTime2
      }
      console.log(currentTime1, 'currentTime1')
      this.videoDom1.currentTime = currentTime1
      this.currentTime1 = this.videoDom1.currentTime
    //   console.log(this.videoDom1.currentTime, 'video1当前时间')
    //   console.log(this.videoDom2.currentTime, 'video2当前时间')
      //   this.percent = 100 * this.videoDom1.currentTime / this.videoDom1.duration
      //   this.currentTime = this.timeTranslate(this.videoDom1.currentTime)
    },
    timeTranslate (t) { // 时间转化
      let m = Math.floor(t / 60)
      m < 10 && (m = '0' + m)
      return m + ':' + (t % 60 / 100).toFixed(2).slice(-2)
    },
    getOffset (node, offset) { // 获取当前屏幕下进度条的左偏移量
      if (!offset) {
        offset = {}
        offset.left = 0
      }
      if (node === document.body || node === null) {
        return offset
      }
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
            justify-content: center;
            align-items: center;
            .video-control-bg {
                width: 500px;
                height:5px;
                display: flex;
                background-color: #aaa;
                margin-left:10px;
                border-radius: 2.5px;
                position: relative;
                cursor: pointer;
                // .video_control-bg-outside:first-child{
                //     border-radius: 2.5px 0 0 2.5px;
                // }
                // .video_control-bg-outside:last-child{
                //     border-radius: 0 2.5px 2.5px 0;
                // }
                .video_control-bg-outside{
                    height: 5px;
                    border-radius: 2.5px;
                    background-color: #555;
                    cursor: pointer;
                }
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
            .video_control-time{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left:10px;
                font-size: 14px;
                color:#fff;
            }
        }
    }
}

</style>
