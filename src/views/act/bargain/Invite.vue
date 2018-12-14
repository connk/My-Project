<template>
    <div class="bargain">
        <div class="cont marg">
            <div class="time">还剩{{ info.countDownTime }}结束</div>
            <div class="help-list">
                <div class="help-li" v-for="(li, index) in info.bargainByWishNotes" :key="index">
                    <p class="date">{{ li.createTime }}</p>
                    <p class="text">您的好友{{ li.bargainByName }}发来砍价祝福：{{ li.bargainByWishNote }}</p>
                </div>
            </div>
        </div> 

        <div class="cont marg">
            <div class="car">
                <div class="car-img">
                    <img :src="info.bargainImagePath1" >
                </div>
                <div class="car-info">
                    <div class="car-title">{{ info.bargainTitle }}</div>
                    <div class="car-tips">包上牌 \ 购置税 \ 赠1年保险</div>
                    <div class="car-price">首付<span style="color:#363636"><font>￥</font>{{ info.bargainDownPayment }}</span></div>
                </div>
            </div>
            <div class="progress">
                <van-progress color="#20CEB3" :show-pivot='false' :percentage="percentage" />
                <div class="info">
                    <span>已砍{{ info.bargainPaymentAfter }}元</span>
                    <span>剩余帮砍次数：{{ info.bargainTimes-info.bargainCounts}}次</span>
                </div>
            </div>   
        </div>

        <div class="marg price-tips">
            剩余首付<span><font>￥</font>{{ info.bargainDownPaymentAfter}}</span>
        </div>

        <div class="marg">
            <van-button size="large" @click="toHelp()" :disabled="info.countDownTime == '00:00:00'" type="primary">邀请好友砍价</van-button>
        </div>

        <div class="marg">
            <van-button size="large" @click="submitCar" type="default">立即提车</van-button>
        </div>

    </div>
</template>

<script>

import { Toast } from 'vant';

export default {
    name: 'invite',
    data() {
        return  {
            facNo: '',
            bargainUserId: '',
            percentage: 0,
            info:{}
        }
    },
    created() {
        let that = this;
        that.facNo = that.$store.state.facNo;//当前用户设备号
        that.bargainUserId = that.$store.state.userInfo.userVo.telphone;//当前用户
        
    },
    mounted() {
        this.getInfo();

    },
    methods: {
        toHelp(){
            let that = this;

            //that.$store.commit('setPageData',true);
            sessionStorage.setItem('share',true);

            window.location.href = '/act/bargain/help?bargainUserId=' + that.bargainUserId

            // that.$router.push({
            //     path: '/act/bargain/help',
            //     query: {
            //         bargainUserId: that.bargainUserId
            //     }
            // });

        },
        submitCar(){//立即提车
            let that = this;
            that.$post('/active/activityorder',{
                orderType: '5',
                orderId: that.info.id
            }).then((res) => {
                console.log(res);
                if(res.code == 0){
                    Toast.success('提交成功');
                    that.$router.push({
                        path: '/act/bargain'
                    });
                    //+++++++++++++++
                }
                else{
                    Toast.fail(res.msg);
                }
            })


        },
        getInfo(){
            let that = this;
            that.$post('/active/group_bargain_query',{
                facNo: that.facNo,
                bargainUserId: that.bargainUserId
            }).then((res) => {
                console.log(res);
                if(res.code == 0){
                    that.info = res.data;
                    if(that.info.countDownTime > 0){
                        that.getCountDown(that.info.countDownTime);
                    }
                    else{
                        that.info.countDownTime = '00:00:00'
                    }
                    that.percentage = that.info.bargainCounts/5*100;
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        getCountDown(countDownTime){//设置时间戳
            var that = this;
            var timestamp = countDownTime;

            var endTime = new Date(timestamp * 1000);
            var t = endTime.getTime();
            var d=Math.floor(t/1000/60/60/24);
            var hour=Math.floor(t/1000/60/60%24);
            var min=Math.floor(t/1000/60%60);
            var sec=Math.floor(t/1000%60);

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var countDownTime = hour + ":" + min + ":" + sec;
            that.info.countDownTime = countDownTime

            var interval = setInterval(function(){
                timestamp = timestamp-1;
                if(timestamp == 0){
                    clearInterval(interval);
                }

                var endTime = new Date(timestamp * 1000);
                var t = endTime.getTime();

                var d=Math.floor(t/1000/60/60/24);
                var hour=Math.floor(t/1000/60/60%24);
                var min=Math.floor(t/1000/60%60);
                var sec=Math.floor(t/1000%60);

                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                var countDownTime = hour + ":" + min + ":" + sec;

                that.info.countDownTime = countDownTime

            },1000);
        }
    }
}
</script>

<style>

</style>