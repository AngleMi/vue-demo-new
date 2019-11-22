export default {
  eventTree: {}, // 事件回调队列 存放的是外来的回调队列

  eventLoop: {}, // 事件队列 存放的是addEventListener的回调函数，主要用于removeEventListener，因为移除事件的时候function要求是同一个才能移除

  imageSize: { // 用来限制响应数据
    x: 1,
    y: 1
  },

  originalPoint: {
    x: 0,
    y: 0
  },

  lockPoint: {
    x: -1,
    y: -1
  },

  setImageSize (size) {
    this.imageSize = size
  },

  setOriginalPoint (point) {
    this.originalPoint = Object.assign({}, point)
  },

  addEvent (event, callback) {
    if (!this.eventTree[event]) {
      this.eventLoop[event] = (ev) => {
        if (typeof this.eventTree[event] === 'function') {
          const movement = { x: 0, y: 0 }
          movement.x = ev.pageX - this.originalPoint.x
          movement.y = ev.pageY - this.originalPoint.y
          this.eventTree[event]({ ev, movement })
        }
      }
      window.addEventListener(event, this.eventLoop[event], false)
    }
    this.eventTree[event] = callback
  },

  removeEvent (event) {
    window.removeEventListener(event, this.eventLoop[event], false)
    if (this.eventTree[event]) {
      delete this.eventLoop[event]
      delete this.eventTree[event]
    }
  }
}
// export default new EventFactory();
