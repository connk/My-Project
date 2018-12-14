import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入vant 库
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

//导入图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

import {get, post} from './config/axiox'
//定义全局变量

Vue.prototype.$get = get;
Vue.prototype.$post = post;


var private_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCdh9TYXvY+CBaBMgG6vSAC6Z36npFE0k6Hle8YQJdEHU5fddRNcY7Mm/+/GfB4ssN2Z/sv9om9SDIKRePzYuGNulVBWyPdPqgbiARVU7hxISpT1Se60CHUNisVbiAVixUJ8taXrZ+Zu1zsLCelBzOJz4xmk6fAUEmgFMWKW+M/OQIDAQAB'

//加密
import { JSEncrypt } from 'jsencrypt'
Vue.prototype.$getCode = function (val){

    let encrypt = new JSEncrypt();

    encrypt.setPublicKey(private_key);

    let data = encrypt.encrypt(val);

    return data;

};

//签名
import jsrsasign from 'jsrsasign'
Vue.prototype.$getSign = function (val){

    let rsa = new jsrsasign.RSAKey();


    rsa = jsrsasign.KEYUTIL.getKey(private_key);

    let sig = new jsrsasign.KJUR.crypto.signature({"alg":"SHA1withRSA","prov":"cryptojs/jsrsa"});

    sig.init(rsa);

    sig.updateString(val);

    let sign = jsrsasign.hextob64(sig.sign());

    return sign;

};











Vue.prototype.$store = store;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
