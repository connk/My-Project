<template>
    <div id="app">
        <router-view />
        <!-- <div @click="reSet" style="position: fixed;bottom: 1rem;right: 1rem;z-index: 9;">重置</div> -->
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {

        }
    },
    created: function () {
        (function (doc, win) {
            var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                else{
                    //console.log(clientWidth);
                    if(clientWidth > 760){
                        clientWidth = 760;
                    }
                    if(clientWidth < 320){
                        clientWidth = 320;
                    }
                }
                docEl.style.fontSize = 34.2 * (clientWidth / 320)/2 + 'px';//其中“20”根据你设置的html的font-size属性值做适当的变化
            };
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
    },
    mounted: function(){
        let that = this;

        if(!that.$store.state.facNo){
            let facNo = 'zct54'
            facNo += new Date().getTime();
            that.$store.commit('setFacNo',facNo);
        }
        
    },
    methods: {
        reSet(){
           localStorage.removeItem('facNo');
           localStorage.removeItem('userInfo');
       }
    }
}
</script>

<style>
@import "./assets/css/add.css";
*{
    padding: 0;
    margin: 0;
    border: 0;
}
html,body{
    max-width: 760px;
    min-width: 320px;
    margin: 0 auto;
    background: #F7F7F7;
}
a{
    color: inherit;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
