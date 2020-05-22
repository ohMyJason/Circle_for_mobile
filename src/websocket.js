import Vue from 'vue'
import { Notify } from 'vant'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(Notify)
var websocket = null
// 判断当前浏览器是否支持WebSocket
if ('WebSocket' in window) {
  websocket = new WebSocket('ws://localhost/websocket')
} else {
  alert('Not support websocket')
}

// 连接发生错误的回调方法
websocket.onerror = function () {
  // setMessageInnerHTML("error");
  Notify({ type: 'danger', message: '连接出现错误，请重新连接' })
}

// 连接成功建立的回调方法
websocket.onopen = function (event) {
  console.log('连接成功')
}

// 接收到消息的回调方法
websocket.onmessage = function (event) {
  console.log(event.data)
  var data = JSON.parse(event.data)
  if (data.userName === VueCookies.get('userName')) {
    window.getMessageLog()
  }
}

// 连接关闭的回调方法
websocket.onclose = function () {
  // setMessageInnerHTML("close");
}

// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function () {
  websocket.close()
}
export default websocket
