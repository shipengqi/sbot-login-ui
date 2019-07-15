import axios from 'axios'
import { Message } from 'element-ui'

// 记录和显示错误
function errorLog (err) {
  if (typeof err === 'string') {
    err = new Error(err)
  }

  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    console.error('>>>>>> Error >>>>>>')
    console.log(err)
  }
  // 显示提示
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  timeout: 10 * 1000 // 请求超时时间
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      switch (code) {
        case 0:
          // code === 0 代表没有错误
          return dataAxios.data
        case 200:
          // code === 200 代表没有错误
          return dataAxios.data
        case 201:
          return dataAxios.data
        default:
          // 不是正确的 code
          errorLog(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
