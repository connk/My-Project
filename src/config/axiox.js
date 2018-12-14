import axios from 'axios';
import router from '@/router'
import { Toast } from 'vant';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='https://mobiles.kooche.cn';


//axios.defaults.baseURL ='http://mobiletest.kooche.cn';


//axios.defaults.baseURL ='http://192.168.1.159:8806';

//axios.defaults.baseURL ='http://192.168.1.76:8806';



//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'xkooche-facType': '4'
        }
        //console.log(config)
        if(config.method == 'post'){
            //console.log('post');
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        // if(response.data.code != 0){
        //     if(response.data.code == -30001){
        //         Toast('Token失效，请重新登录');
        //         setTimeout(() => {
        //             router.push({
        //                 path:"/test",
        //                 querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        //             })
        //         },2000);
        //     }
        //     else{
        //         Toast.fail(response.data.msg);
        //         return false;
        //     }

        //     console.warn(response.data);
        // }
         return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err)
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        axios({
            method:"post",
            url: url,
            data: data,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret;
            }],
            }).then((response)=>{
                resolve(response.data);
            },err => {
            reject(err)
        })


        // axios.post(url,data)
        // .then(response => {
        //     resolve(response.data.data);
        // },err => {
        //     reject(err)
        // })
    })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
        .then(response => {
            resolve(response.data.data);
        },err => {
            reject(err)
        })
    })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
        .then(response => {
            resolve(response.data.data);
        },err => {
            reject(err)
        })
    })
}