import axios from 'axios'

import { baseUrl } from '@/config/env'

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 5000                  // 请求超时时间
})

export default service
