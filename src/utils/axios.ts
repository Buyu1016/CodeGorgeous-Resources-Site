// axios基础配置
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:2550/api/',
})

instance.interceptors.response.use(function (response) {
    return response.data
}, function (err) {
    return Promise.reject(err)
})

export default instance
