import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        facNo: null || JSON.parse(localStorage.getItem('facNo')),//设备号
        userInfo: null || JSON.parse(localStorage.getItem('userInfo')),//用户信息
        temporaryData: null || JSON.parse(sessionStorage.getItem('temporaryData')),//临时数据
        pageData:false

    },
    mutations: {
        setFacNo(state, value){
            state.facNo = value;
            localStorage.setItem('facNo',JSON.stringify(state.facNo));
        },
        setUserInfo(state, value){
            state.userInfo = value;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo));
        },
        setTemporaryData(state, value){
            state.temporaryData = value;
            sessionStorage.setItem('temporaryData',JSON.stringify(state.temporaryData));
        },
        setPageData(state, value){
            state.pageData = value;
        }
    },
    actions: {

    }
})
