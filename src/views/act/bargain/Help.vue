<template>
    <div class="bargain">
        <div class="top-tips marg">
            <p>您的好友正在酷车购车平台发起了团购砍价邀请，马上就要提车了。快快填写祝福语帮好友砍一刀价格吧~</p>
        </div>

        <div class="cont marg">
            <div class="car">
                <div class="car-img">
                    <img :src="orderInfo.bargainImagePath1" >
                </div>
                <div class="car-info">
                    <div class="car-title">{{ orderInfo.bargainTitle }}</div>
                    <div class="car-tips">包上牌 \ 购置税 \ 赠1年保险</div>
                    <div class="car-price">首付<span><font>￥</font>{{ orderInfo.bargainDownPayment }}</span></div>
                </div>
            </div>
        </div>

        <div class="cont form" v-show="!orderState">
            <p class="bargain-end">砍价已完成</p>  
        </div>

        <div class="cont form" v-show="orderState">
            <div class="cell">
                <div class="hd">姓名</div>
                <div class="bd">
                    <input type="text" v-model="form.bargainByName" placeholder="请填写姓名">
                </div>
            </div>
            <div class="cell">
                <div class="hd">电话</div>
                <div class="bd">
                    <input type="text" v-model="form.bargainByTelphone" placeholder="请填写联系电话">
                </div>
            </div>
            <div class="cell">
                <div class="hd">祝福语</div>
                <div class="bd">
                    <input type="text" v-model="form.bargainByWishNote" :placeholder=placeholder >
                </div>
            </div>
        </div>

        <div class="marg" v-show="orderState">
            <van-button size="large" @click="submitForm" :disabled="userInfo != null && userInfo.userVo.telphone == orderInfo.bargainTelphone" type="primary">帮忙砍价</van-button>
        </div>

        <div class="marg" v-show="!orderState">
            <van-button size="large" @click="more" type="primary">查看更多</van-button>
        </div>

        <div :class="{'tips-browser-share': !isWeChat,'tips-wechat-share': isWeChat}" v-if="flagShare" @click="closeTips()" ></div>

    </div>
</template>

<script>

import { Toast } from 'vant';

export default {
    name: 'help',
    data() {
        return  {
            facNo: '',
            userInfo: null,
            flagShare: false,
            isWeChat: false,
            orderState: true,
            orderInfo:{},
            form: {
                bargainByName: '',//被砍价姓名
                bargainByTelphone: '',//被砍价手机号码
                bargainByWishNote: '',//被砍价祝福语
            },
            placeholder: ''
        }
    },
    created() {
        let that = this;
        that.facNo = that.$store.state.facNo;//当前用户设备号
        that.userInfo = that.$store.state.userInfo;//当前用户设备号

        console.log(that.userInfo)


    },
    mounted() {
        let that = this;
        this.getOrderInfo();
        this.isWeChatSet();

        let flag = sessionStorage.getItem('share');
        if(flag){
            that.flagShare = true;
            sessionStorage.removeItem('share');
        }


        //this.setShare();

    },
    methods: {

        
        submitForm(){
            let that = this;
            if(!that.form.bargainByName){
                Toast.fail('请输入姓名');
                return false;
            }
            if(that.form.bargainByTelphone.length != 11){
                Toast.fail('请输入正确手机号');
                return false;
            }
            if(!that.form.bargainByWishNote){
                that.form.bargainByWishNote = '恭喜 '+ that.orderInfo.bargainName +' 喜提 '+ that.orderInfo.bargainTitle +' 一台。';
            }
            console.log(that.form);
            that.$post('/active/group_bargain_add',{

                facNo: that.facNo,//设备号
                bargainUserId: that.$route.query.bargainUserId,//发起砍价用户id
                bargainByTelphone: that.form.bargainByTelphone,//被砍价手机号码
                bargainByName: that.form.bargainByName,//被砍价姓名
                bargainByWishNote: that.form.bargainByWishNote,//被砍价祝福语
            }).then((res) => {
                //console.log(res);
                if(res.code == 0){
                    Toast.success('砍价成功');
                    that.orderState = false;

                    let second = 2;
                    const timer = setInterval(() => {
                        second--;
                        if (!second) {
                            clearInterval(timer);
                            Toast.clear();
                        }
                    }, 1000);

                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        getOrderInfo(){
            let that = this;
            that.$post('/active/group_bargain_query',{
                facNo: that.facNo,
                bargainUserId: that.$route.query.bargainUserId
            }).then((res) => {
                console.log(res);
                if(res.code == 0){
                    let data = res.data;
                    that.orderInfo = data;

                    that.placeholder = '恭喜 '+ that.orderInfo.bargainName +' 喜提 '+ that.orderInfo.bargainTitle +' 一台。';

                    if(data.bargainOrderId){
                        if(data.bargainOrderId.length > 19 ){//提车了
                            Toast.fail('活动已结束');
                            that.orderState = false;
                        }
                        else{
                            if(data.bargainByWishNotes.length > 0){
                                for(var i = 0; i < data.bargainByWishNotes.length; i++){
                                    if(that.facNo == data.bargainByWishNotes[i].facNo){
                                        Toast.fail('你已经砍过价了');
                                        that.orderState = false;
                                    }
                                }
                            }
                        }
                    }
                    else{
                        Toast.fail('查询订单错误');
                        let second = 2;
                        const timer = setInterval(() => {
                            second--;
                            if (!second) {
                                clearInterval(timer);
                                Toast.clear();
                                location.href = 'https://m.kooche.cn';
                            }
                        }, 1000);
                    }
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        closeTips(){
            this.flagShare = false;
        },
        isWeChatSet(){
            let that = this;
            let ua = navigator.userAgent.toLowerCase();
            let isWeixin = ua.indexOf('micromessenger') != -1;
            let isQQ = ua.indexOf('qq') != -1;
            if (isWeixin || isQQ) {
                that.isWeChat = true;
            }else{
                that.isWeChat = false;
            }
        },
        more(){
            location.href = 'https://m.kooche.cn';
        },
        setShare(){
            let that = this;

            var baseUrl = 'http://acmtest.kooche.cn';

            var shareUrl = baseUrl + that.$route.path + '?bargainUserId=' + that.$route.query.bargainUserId; //分享的url地址
            var title = '帮忙砍价';//分享的标题
            var summary = '帮忙砍价描述'; //分享的描述
            var imgUrl = '';

            alert(window.location.href);


            that.$post('/wx/query_accesstoken',{
                posturl: window.location.href
            }).then((res) => {

                var data = res.data;
 
                //alert(data.appId);
                //alert(data.signature);


                wx.config({
                    debug: true, 
                    appId: data.appId, 
                    timestamp: data.timestamp, 
                    nonceStr:data.nonceStr, 
                    signature: data.signature,
                    jsApiList:['checkJsApi', 'startRecord', 'stopRecord','translateVoice','updateAppMessageShareData','updateTimelineShareData']
                });

                wx.ready(function(){
                    alert(1)

                    shareUrl = window.location.href.split('#')[0];

                    wx.updateAppMessageShareData({ 
                        title: title, // 分享标题
                        desc: summary, // 分享描述
                        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            alert(2);
                            // 设置成功
                        }
                    });
                    // wx.updateTimelineShareData({ 
                    //     title: title, // 分享标题
                    //     desc: summary, // 分享描述
                    //     link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    //     imgUrl: imgUrl, // 分享图标
                    //     success: function () {
                    //         alert(3);
                    //         // 设置成功
                    //     }
                    // });
                });
                wx.error(function(res){
                    alert(4)
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            })


        },
    }
}
</script>

<style>

</style>