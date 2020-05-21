// upLoaderImg.js
import axios from 'axios'
// 引入axios
import { Toast } from 'vant'
// 引入Toast
import VueCookies from 'vue-cookies'
import Vue from 'vue'

Vue.use(VueCookies)
function upLoaderImg (file, flag) {
  // file为 你读取成功的回调文件信息
  // new 一个FormData格式的参数
  let params = new FormData()
  params.append('file', file)
  if (flag !== 3) {
    params.append('flag', flag)
  }
  let config = {
    headers: { // 添加请求头
      'Content-Type': 'multipart/form-data',
      'token': VueCookies.get('token')
    }
  }
  var baseUrl = 'http://192.168.0.103/'
  var uploadUrl = ''
  if (flag === 1 || flag === 4) {
    uploadUrl = baseUrl + 'blog/uploadResource'
  } else if (flag === 3) {
    uploadUrl = baseUrl + 'userInfo/changeAvatar'
  } else {
    uploadUrl = baseUrl + 'fileUpload'
  }
  return new Promise((resolve, reject) => {
    // 把 uploadUrl 换成自己的 上传路径
    axios.post(uploadUrl, params, config).then(res => {
      if (res && res.data && res.data.code === 0) {
        // 如果为真 resolve出去
        resolve(res.data)
      } else {
        // 否则 Toast 提示
        Toast.fail(res.data && (res.data.msg))
        reject(res.data)
      }
    }).catch(err => {
      Toast.fail('上传失败')
      reject(err)
    })
  })
}
export default upLoaderImg
