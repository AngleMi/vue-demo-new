<template>
  <div class="foo">
    <!-- foo -->
    <div class="draggable" id="rect" style="position:absolute;background:red;width:20px;height:20px">
    </div>
    <div id="status"></div>
  </div>
</template>

<script>
export default {
  name: 'foo',
  components: {},
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // debounce (fn, delay) {
    //   let timer = null
    //   return function () {
    //     if (timer) {
    //       clearTimeout(timer)
    //     }
    //     timer = setTimeout(fn, delay)
    //   }
    // },
    // scrollTop () {
    //   const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //   console.log(scrollTop)
    // }
  },
  mounted () {
    // window.onscroll = this.debounce(this.scrollTop, 1000)
    function EventTarget () {
      this.handlers = {}
    }
    EventTarget.prototype = {
      constructor: EventTarget,
      addHandler: function (type, handler) {
        if (typeof this.handlers[type] === 'undefined') {
          this.handlers[type] = []
        }
        this.handlers[type].push(handler)
      },
      fire: function (event) {
        if (!event.target) {
          event.target = this
        }
        if (this.handlers[event.type] instanceof Array) {
          var handlers = this.handlers[event.type]
          for (let i = 0, len = handlers.length; i < len; i++) {
            handlers[i](event)
          }
        }
      },
      removeHandler: function (type, handler) {
        if (this.handlers[type] instanceof Array) {
          let handlers = this.handlers[type]
          for (let i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i] === handler) {
              break
            }
            handlers.splice(i, 1)
          }
        }
      }
    }
    const EventUtil = {
      addHandler: function (element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, handler)
        } else {
          element['on' + type] = handler
        }
      },
      removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
          element.removeEventListener(type, handler, false)
        } else if (element.detachEvent) {
          element.detachEvent('on' + type, handler)
        } else {
          element['on' + type] = null
        }
      },
      getEvent: function (event) {
        return event || window.event
      },
      getTarget: function (event) {
        return event.target || event.srcElement
      },
      preventDefault: function (event) {
        if (event.preventDefault) {
          event.preventDefault()
        } else {
          event.returnValue = false
        }
      },
      stopPropagation: function (event) {
        if (event.stopPropagation) {
          event.stopPropagation()
        } else {
          event.cancelBubble = true
        }
      }
    }
    // const DragDrop = function () {
    //   let dragging = null
    //   let diffX = 0
    //   let diffY = 0

    //   function handleEvent (event) {
    //     // 获取事件和目标
    //     event = EventUtil.getEvent(event)
    //     const target = EventUtil.getTarget(event)
    //     switch (event.type) {
    //       case 'mousedown':
    //         if (target.className.indexOf('draggable') > -1) {
    //           dragging = target
    //           diffX = event.clientX - target.offsetLeft
    //           diffY = event.clientY - target.offsetTop
    //         }
    //         break
    //       case 'mousemove':
    //         if (dragging !== null) {
    //           dragging.style.left = (event.clientX - diffX) + 'px'
    //           dragging.style.top = (event.clientY - diffY) + 'px'
    //         }
    //         break
    //       case 'mouseup':
    //         dragging = null
    //         break
    //     }
    //   }
    //   return {
    //     enable: function () {
    //       EventUtil.addHandler(document, 'mousedown', handleEvent)
    //       EventUtil.addHandler(document, 'mousemove', handleEvent)
    //       EventUtil.addHandler(document, 'mouseup', handleEvent)
    //     },
    //     disable: function () {
    //       EventUtil.removeHandler(document, 'mousedown', handleEvent)
    //       EventUtil.removeHandler(document, 'mousemove', handleEvent)
    //       EventUtil.removeHandler(document, 'mouseup', handleEvent)
    //     }
    //   }
    // }
    // DragDrop().enable()
    // DragDrop().disable()

    // 添加自定义事件
    const DragDrop = (function () {
      let dragdrop = new EventTarget()
      let dragging = null
      let diffX = 0
      let diffY = 0

      function handleEvent (event) {
        // 获取事件和目标
        event = EventUtil.getEvent(event)
        const target = EventUtil.getTarget(event)
        switch (event.type) {
          case 'mousedown':
            if (target.className.indexOf('draggable') > -1) {
              dragging = target
              diffX = event.clientX - target.offsetLeft
              diffY = event.clientY - target.offsetTop
              dragdrop.fire({ type: 'dragstart', target: dragging, x: event.clientX, y: event.clientY })
            }
            break
          case 'mousemove':
            if (dragging !== null) {
              dragging.style.left = (event.clientX - diffX) + 'px'
              dragging.style.top = (event.clientY - diffY) + 'px'
              dragdrop.fire({ type: 'drag', target: dragging, x: event.clientX, y: event.clientY })
            }
            break
          case 'mouseup':
            dragdrop.fire({ type: 'dragend', target: dragging, x: event.clientX, y: event.clientY })
            dragging = null
            break
        }
      }
      dragdrop.enable = function () {
        EventUtil.addHandler(document, 'mousedown', handleEvent)
        EventUtil.addHandler(document, 'mousemove', handleEvent)
        EventUtil.addHandler(document, 'mouseup', handleEvent)
      }
      dragdrop.disable = function () {
        EventUtil.removeHandler(document, 'mousedown', handleEvent)
        EventUtil.removeHandler(document, 'mousemove', handleEvent)
        EventUtil.removeHandler(document, 'mouseup', handleEvent)
      }
      return dragdrop
    }())
    DragDrop.addHandler('dragstart', function (event) {
      let status = document.getElementById('status')
      status.innerHTML = 'Started dragging ' + event.target.id
    })
    DragDrop.addHandler('drag', function (event) {
      let status = document.getElementById('status')
      status.innerHTML += '<br/> Dragged ' + event.target.id + 'to (' + event.x + ',' + event.y + ')'
    })
    DragDrop.addHandler('dragend', function (event) {
      let status = document.getElementById('status')
      status.innerHTML += '<br/> Dropped ' + event.target.id + ' at (' + event.x + ',' + event.y + ')'
    })
    DragDrop.enable()
    DragDrop.disable()

    // 封装一个cookie
    const CookieUtil = {
      get: function (name) {
        const cookieName = encodeURIComponent(name) + '='
        const cookieStart = document.cookie.indexOf(cookieName)
        let cookieValue = null
        if (cookieStart > -1) {
          let cookieEnd = document.cookie.indexOf(';', cookieStart)
          if (cookieEnd === -1) {
            cookieEnd = document.cookie.length
          }
          cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }
        return cookieValue
      },
      set: function (name, value, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
        if (expires instanceof Date) {
          cookieText += '; expires=' + expires.toGMTString()
        }
        if (path) {
          cookieText += '; path=' + path
        }
        if (domain) {
          cookieText += '; domain=' + domain
        }
        if (secure) {
          cookieText += '; secure'
        }
        document.cookie = cookieText
      },
      unset: function (name, path, domain, secure) {
        this.set(name, '', new Date(0), path, domain, secure)
      }
    }
    // 设置cookie
    CookieUtil.set('name', 'zhimin')
    CookieUtil.set('book', 'professional javascript')
    // CookieUtil.set('name', 'zhimin', '/books/projs/', 'www.wrox.com', new Date('December 1, 2019'))
    // 读取cookie
    // console.log(CookieUtil.get('name'))
    // console.log(CookieUtil.get('book'))
    CookieUtil.unset('name')
    CookieUtil.unset('book')

    // 封装一个子cookie
    const SubCookieUtil = {
      // 获取单个子cookie的值
      get: function (name, subName) {
        const subCookies = this.getAll(name)
        if (subCookies) {
          return subCookies[subName]
        } else {
          return null
        }
      },
      // 获取所有子cookie并将它们放入一个对象中返回
      getAll: function (name) {
        const cookieName = encodeURIComponent(name) + '='
        const cookieStart = document.cookie.indexOf(cookieName)
        let cookieEnd
        let cookieValue = null
        let result = {}
        if (cookieStart > -1) {
          cookieEnd = document.cookie.indexOf(';', cookieStart)
          if (cookieEnd === -1) {
            cookieEnd = document.cookie.length
          }
          cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
          if (cookieValue.length > 0) {
            const subCookies = cookieValue.split('&')
            for (let i = 0, len = subCookies.length; i < len; i++) {
              const parts = subCookies[i].split('=')
              result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
            }
            return result
          }
        }
        return null
      },
      // 设置单个子cookie
      set: function (name, subName, value, expires, path, domain, secure) {
        let subcookies = this.getAll(name) || {}
        subcookies[subName] = value
        this.setAll(name, subcookies, expires, path, domain, secure)
      },
      // 设置多个子cookie 参数subcookies是一个对象
      setAll: function (name, subcookies, expires, path, domain, secure) {
        let cookieText = encodeURIComponent(name) + '='
        let subcookieParts = []
        for (let subName in subcookies) {
          if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
            subcookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subcookies[subName]))
          }
        }
        if (subcookieParts.length > 0) {
          cookieText += subcookieParts.join('&')
          if (expires instanceof Date) {
            cookieText += '; expires=' + expires.toGMTString()
          }
          if (path) {
            cookieText += '; path=' + path
          }
          if (domain) {
            cookieText += '; domain=' + domain
          }
          if (secure) {
            cookieText += '; secure'
          }
        } else {
          cookieText += '; expires=' + (new Date(0)).toGMTString()
        }
        document.cookie = cookieText
      },
      // 删除某个cookie中的单个子cookie而不影响其他的
      unset: function (name, subName, path, domain, secure) {
        const subcookies = this.getAll(name)
        if (subcookies) {
          delete subcookies[subName]
          this.setAll(name, subcookies, null, path, domain, secure)
        }
      },
      // 用于删除整个cookie
      unsetAll: function (name, path, domain, secure) {
        this.setAll(name, null, new Date(0), path, domain, secure)
      }
    }
    // 设置两个cookie
    // SubCookieUtil.set('data', 'name', 'zhimin')
    // SubCookieUtil.set('data', 'book', 'professional javascript')
    // 设置全部子cookie和失效日期
    SubCookieUtil.setAll('data', { name: 'zhimin', book: 'professional javascript' }, new Date('January 1, 2020'))
  }
}
</script>
