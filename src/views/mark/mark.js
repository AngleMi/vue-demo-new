import Vue from 'vue'
import Component from 'vue-class-component'
import _math from 'lodash/math'
// import API from '../api'
// import MultiLevelLabels from '../components/multi-level-labels.vue'
// import PaintComponent from '../components/paint-component.vue'
// import MarkLayer from '../components/mark-layer.vue'
// import Cache from '@/common/utils/Cache'

export default @Component({
  props: {
    taskId: {
      type: String,
      required: true
    }
  },
  components: {
    // MultiLevelLabels,
    // MarkLayer,
    // PaintComponent,
  },
  computed: {
    taskStatus () {
      // 任务状态  ‘complete’完成 ‘building’未生成 ‘builded’ 已生成 ‘nofragment’没有未标注的数据了
      // if (this.fragmentStatus === 'error') {
      //   return 'error'
      // }
      // if (this.fragment.task_finished === true) {
      //   return 'complete'
      // }
      // if (this.fragment.task_finished === false && this.fragment.source) {
      //   return 'builded'
      // }
      // if (this.fragment.task_finished === false && (!this.fragment.source)) {
      //   return 'error'
      // }
      // if (this.fragment.fragment_account && !this.fragment.source) {
      //   return 'nofragment'
      // }
      // return 'loading'
    }
  },
  watch: {
    $route: {
      handler () {
        // this.markOrRemark = this.$route.path.includes('remark') ? 'remark' : 'mark'
        // this.reinitData()
        // this.destroyMarkDurationTimer()
        // this.getFragmentAndLabels()
      },
      immediate: true
    },
    markList: {
      // handler (newMarkList) {
      //   const markInfo = {
      //     taskId: this.taskId,
      //     fragmentId: this.fragment.fragment_id,
      //     markList: newMarkList
      //   }
      //   Cache.saveCache('markInfoCache', JSON.stringify(markInfo))
      // },
      // deep: true
    }
  }
})
class Mark extends Vue {
    markOrRemark = 'mark';

    // 切片对象
    fragment = {
      source: '',
      marks: []
    };

    labelList = [];

    activeMark = {
      index: '',
      labels: [],
      text: ''
    };

    markList = [];

    rejectMsgOpen = '1';

    // 切片用时
    markDuration = 0;

    fragmentStatus = '';

    errorMessage = '';

    noMarked = false;

    zoom = 1;

    mouseStatus = 'draw';

    drawShapType = 'rectangle';

    activeIndexErrorList = [];

    rejectResonOpen = '1';

    handleToggleMouseStatus () {
      if (this.mouseStatus === 'draw') {
        this.mouseStatus = 'drag'
      } else {
        this.mouseStatus = 'draw'
      }
    }

    handleSetDrawAndDrawShapType (shape) {
      const markElement = this.$refs['mark-element']
      markElement.style.cursor = 'default'
      this.mouseStatus = 'draw'
      this.drawShapType = shape
    }

    handleSelectActiveIndex (active) {
      const index = this.getMarkListActiveIndex(active)
      if (index > -1) {
        this.markList[index].status = ''
        this.activeMark = this.markList[index]
      } else {
        this.activeMark = {
          index: '',
          labels: [],
          text: ''
        }
      }
    }

    handleInputFocus () {
      this.$refs.activeMarkInput.focus()
    }

    handlenoMarked () {
      if (this.noMarked === true) {
        this.markList = []
        this.fragment.marks = []
        this.activeMark = {
          index: '',
          labels: [],
          text: ''
        }
      }
    }

    getMarkListActiveIndex (active) {
      let markListActiveIndex = -1
      this.markList.forEach((mark, index) => {
        if (mark.index === active) {
          markListActiveIndex = index
        }
      })
      return markListActiveIndex
    }

    handlePathChanges (pathList) {
      const newMarkList = []
      pathList.forEach((path) => {
        if (!path || !path.index) {
          return
        }
        const index = this.getMarkListActiveIndex(path.index)
        const mark = {
          index: path.index,
          labels: [],
          text: '',
          graph_path: path.graph_path,
          graph_shape: path.graph_shape
        }
        if (index > -1) {
          mark.labels = this.markList[index].labels
          mark.text = this.markList[index].text
          mark.status = this.markList[index].status
        }
        newMarkList.push(mark)
      })
      this.markList = newMarkList
      const markListActiveIndex = this.getMarkListActiveIndex(this.activeMark.index)
      if (markListActiveIndex > -1) {
        this.markList[markListActiveIndex].labels = this.activeMark.labels
        this.markList[markListActiveIndex].text = this.activeMark.text
        this.activeMark = this.markList[markListActiveIndex]
      }
    }

    handleZoom (type) {
      if (type === 'in') {
        if (this.zoom <= 0.2) {
          this.$Message.destroy()
          this.$Message.info('已经缩小到最小了')
          return
        }
        if (this.zoom > 1) {
          if ((this.zoom * 100) % 25 !== 0) {
            this.zoom = _math.floor(this.zoom / 0.25) * 0.25
          } else {
            this.zoom += -0.25
          }
          return
        }
        if ((this.zoom * 100) % 10 !== 0) {
          this.zoom = _math.floor(this.zoom / 0.1) * 0.1
        } else {
          this.zoom += -0.1
        }
      } else {
        if (this.zoom >= 4) {
          this.$Message.destroy()
          this.$Message.info('已经放大到最大了')
          return
        }
        if (this.zoom >= 1) {
          if ((this.zoom * 100) % 25 !== 0) {
            this.zoom = _math.ceil(this.zoom / 0.25) * 0.25
          } else {
            this.zoom += 0.25
          }
          return
        }
        if ((this.zoom * 100) % 10 !== 0) {
          this.zoom = _math.ceil(this.zoom / 0.1) * 0.1
        } else {
          this.zoom += 0.1
        }
      }
      this.zoom = _math.round(this.zoom, 2)
    }

    // 获取切片的标注时长
    createMarkDurationTimer () {
      this.destroyMarkDurationTimer()
      this.markDuration = this.fragment.locktime || 0
      this.markDurationTimer = setInterval(() => {
        if (this.markDuration < 1000) {
          this.markDuration = 0
          this.fragmentStatus = 'locked'
          this.destroyMarkDurationTimer()
        } else {
          this.fragmentStatus = this.fragmentStatus === 'locked' ? '' : this.fragmentStatus
          this.markDuration += -1000
        }
      }, 1000)
    }

    destroyMarkDurationTimer () {
      if (this.markDurationTimer) {
        clearInterval(this.markDurationTimer)
      }
    }

    // 加载切片数据
    // getFragment() {
    //     if (this.markOrRemark === 'mark') {
    //         return API.getFragment({
    //             taskId: this.taskId,
    //             fragmentStatus: '0',
    //         }).then(({ result }) => {
    //             if (result) {
    //                 this.fragment = result;
    //                 this.createMarkDurationTimer();
    //                 this.noMarked = this.fragment.no_marked === 'N';
    //                 this.markList = result.marks || [];
    //                 // 本地保存的权重高于服务端
    //                 this.getLocalMarkInfo();
    //             }
    //         });
    //     }
    //     return API.getFragment({
    //         taskId: this.taskId,
    //         fragmentStatus: '4',
    //     }).then(({ result }) => {
    //         if (result) {
    //             this.fragment = result;
    //             this.noMarked = this.fragment.no_marked === 'N';
    //             this.markList = result.marks || [];
    //             // 本地保存的权重高于服务端
    //             this.getLocalMarkInfo();
    //         }
    //     });
    // }

    getLocalMarkInfo () {
      const localMarkInfo = JSON.parse(Cache.getCache('markInfoCache'))
      if (localMarkInfo && localMarkInfo.fragmentId === this.fragment.fragment_id && localMarkInfo.markList.length) {
        this.markList = localMarkInfo.markList
        this.fragment.marks = localMarkInfo.markList
        this.filterErrorList(localMarkInfo.markList)
      }
    }

    filterErrorList (list) {
      if (!list) {
        return
      }
      const errorList = []
      list.forEach((item) => {
        if (item.status === 'error') {
          errorList.push(item.index)
        }
      })
      this.activeIndexErrorList = errorList
    }

    // 获取标签的接口
    // getLabels() {
    //     return API.getLabels({
    //         taskId: this.taskId,
    //     }).then(({ result }) => {
    //         if (result) {
    //             this.labelList = result || [];
    //         }
    //     });
    // }

    reinitData () {
      this.fragment = {
        source: '',
        marks: []
      }
      this.activeMark = {
        index: '',
        labels: [],
        text: ''
      }
      this.fragmentStatus = ''
      this.noMarked = false
      this.mouseStatus = 'draw'
    }

    // 重新加载切片的信息
    reloadFragment () {
      this.reinitData()
      this.destroyMarkDurationTimer()
      this.getFragment()
        .catch(({ message, result }) => {
          this.fragmentStatus = 'error'
          this.errorMessage = message
          if (result) {
            this.fragment = result
          }
        })
    }

    handleValidate () {
      if (this.noMarked) {
        return true
      }
      if (!this.markList || this.markList.length <= 0) {
        this.$Message.error('请对图片进行标注')
        return false
      }
      if (!this.fragment.is_exist_text && !this.fragment.is_exist_label) {
        return true
      }
      if (!this.fragment.is_require_text && !this.fragment.is_require_label) {
        return true
      }
      let validate = true
      const errorList = []
      this.activeIndexErrorList = []
      this.markList.forEach((mark, index) => {
        if (this.fragment.is_require_text) {
          if (!mark.text) {
            validate = false
            errorList.push(index)
            this.activeIndexErrorList.push(mark.index)
            return
          }
        }
        if (this.fragment.is_require_label) {
          if (!mark.labels || mark.labels.length === 0) {
            validate = false
            errorList.push(index)
            this.activeIndexErrorList.push(mark.index)
          }
        }
      })
      if (!validate) {
        this.$Message.error('您提交的数据有误，请修正后再次提交')
        this.handleErrorStatus(errorList)
      }
      return validate
    }

    handleErrorStatus (errorList) {
      errorList.forEach((markIndex) => {
        const mark = this.markList[markIndex]
        mark.status = 'error'
        this.$set(this.markList, markIndex, mark)
      })
    }

    // 标注切片的接口
    // handleSubmit() {
    //     this.activeMark = {
    //         index: '',
    //         labels: [],
    //         text: '',
    //     };
    //     if (!this.handleValidate()) {
    //         return;
    //     }
    //     this.fragmentStatus = 'request';
    //     API.annotateFragment({
    //         task_id: this.taskId,
    //         fragment_id: this.fragment.fragment_id,
    //         marks: this.markList,
    //         mark_num: this.fragment.mark_num,
    //         no_marked: this.noMarked === true ? 'N' : 'Y',
    //     }).then(() => {
    //         this.fragmentStatus = 'success';
    //         this.$Message.info('标注成功，请继续标注');
    //         this.reloadFragment();
    //     }).catch((error) => {
    //         this.fragmentStatus = 'error';
    //         this.errorMessage = error.message;
    //     });
    // }

    getFragmentAndLabels () {
      this.getFragment().then(() => {
        if (this.fragment.task_finished === false && this.fragment.source && this.fragment.is_exist_label) {
          this.getLabels()
        }
      }).catch(({ message, result }) => {
        this.fragmentStatus = 'error'
        this.errorMessage = message
        if (result) {
          this.fragment = result
        }
      })
    }

    removeCache = (event) => {
      Cache.handleForceRefresh('markInfoCache', event)
    }

    created () {
      document.addEventListener('keydown', this.removeCache, false)
    }

    mounted () {
      document.addEventListener('keydown', this.handleHotKey, false)
      if ('onmousewheel' in document) {
        document.addEventListener('mousewheel', this.handleZoomEvent, false)
      } else {
        document.addEventListener('DOMMouseScroll', this.handleZoomEvent, false)
      }
    }

    handleHotKey (e) {
      if (e.keyCode === 13 && e.ctrlKey) {
        this.handleSubmit()
      }
    }

    handleZoomEvent (e) {
      if (!e.shiftKey) { return }
      e.preventDefault()
      const eventDirectory = e.wheelDelta || e.detail
      if (eventDirectory < 0) {
        this.handleZoom('in')
      } else {
        this.handleZoom('out')
      }
    }

    beforeDestroy () {
      this.destroyMarkDurationTimer()
      document.removeEventListener('keydown', this.removeCache, false)
      document.removeEventListener('keydown', this.handleHotKey, false)
      if ('onmousewheel' in document) {
        document.removeEventListener('mousewheel', this.handleZoomEvent, false)
      } else {
        document.removeEventListener('DOMMouseScroll', this.handleZoomEvent, false)
      }
    }
}
