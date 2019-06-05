import axios from 'axios'
import {message} from 'antd'
import qs from 'qs'

//1.axios的默认配置
axios.defaults.baseURL = "http://127.0.0.1:8888"
axios.defaults.headers["Content-Type"]="application/x-www-form-urlencoded"

//2.拦截器设置
axios.interceptors.request.use((config)=>{
    if(config.method === "post"){
        config.data = qs.stringify(config.data)
    }
    return config;
})
axios.interceptors.response.use((response)=>{
    console.log('interceptor:',response);
    let {data} = response;
    response.status = data.status;
    response.statusText = data.message;
    response.data = data.data;
    return response;
},(error)=>{
    message.error("服务器异常!")
    return Promise.reject(error);
})

export default axios;