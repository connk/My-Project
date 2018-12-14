<template>
    <div class="bargain">
        <div class="top-tips marg">
            <p>请填写个人信息，以便我们做优惠登记，购车时享受砍价后首付价。</p>
        </div>

        <div class="cont marg">
            <div class="car">
                <div class="car-img">
                    <img :src="carInfo.image_path1" >
                </div>
                <div class="car-info">
                    <div class="car-title">{{ carInfo.car_name_cn }}</div>
                    <div class="car-tips">包上牌 \ 购置税 \ 赠1年保险</div>
                    <div class="car-price">首付<span><font>￥</font>{{ carInfo.down_payment*10000 }}</span></div>
                </div>
            </div>
        </div>

        <div class="cont form">
            <div class="cell">
                <div class="hd">车型</div>
                <div class="bd">{{ carInfo.car_name_cn }}</div>
            </div>
            <div class="cell">
                <div class="hd">姓名</div>
                <div class="bd">
                    <input type="text" v-model="form.bargainName" placeholder="请填写姓名">
                </div>
            </div>
            <div class="cell">
                <div class="hd">电话</div>
                <div class="bd">
                    <input type="text" v-model="form.bargainTelphone" placeholder="请填写联系电话">
                </div>
            </div>
        </div>

        <div class="marg">
            <van-button size="large" @click="submitForm" type="primary">开始砍价</van-button>
        </div>

    </div>
</template>

<script>

import { Toast } from 'vant';

export default {
    name: 'start',
    data() {
        return  {
            facNo: '',
            bargainUserId: '',
            carInfo:{},
            form:{},
            adcode: 440300
        }
    },
    created() {
        let that = this;
        that.facNo = that.$store.state.facNo;//当前用户设备号
        that.bargainUserId = that.$store.state.userInfo.userVo.telphone;//当前用户
        that.carInfo = that.$store.state.temporaryData || {};//车信息
        

        let geolocation = new qq.maps.Geolocation();
        geolocation.getIpLocation(function (val){
            that.adcode = val.adcode
        })


    },
    mounted() {
        let that = this;
        
        
        if(that.carInfo){
            that.form = {
                facNo: that.facNo,//设备号
                bargainUserId: that.bargainUserId,//发起砍价用户
                bargainSkuId: that.carInfo.sku_id,//砍价skuid
                bargainTitle: that.carInfo.car_name_cn,//砍价标题
                bargainImagePath1: that.carInfo.image_path1,//车图片
                bargainVendorPrice: that.carInfo.vendorPrice,//厂商指导价
                bargainPeriods: that.carInfo.periods,//砍价期数
                bargainAppointmentName: that.carInfo.appointment_name,//方案名称
                bargainAppointmentId: that.carInfo.appointment_id,//方案id
                bargainName: '',//发起砍价姓名
                bargainTelphone: '',//砍价手机号码
                buycarCity: that.adcode,//城市编码
                bargainDownPayment: that.carInfo.down_payment*10000,//砍价首付
                bargainMonthPayment: that.carInfo.month_payment// 砍价月供
            }
        }

        // this.$jq('.cell').click(function (){
        //     alert()
        // })
        
    },
    methods: {
        submitForm(){
            let that = this;
            if(!that.form.bargainName){
                Toast.fail('请输入姓名');
                return false;
            }
            if(that.form.bargainTelphone.length != 11){
                Toast.fail('请输入正确手机号');
                return false;
            }
            console.log(that.form);
            that.$post('/active/group_bargain_push',that.form).then((res) => {
                console.log(res);
                if(res.code == 0){
                    Toast.success('发起砍价');
                    this.$router.push({
                        path: '/act/bargain/invite'
                    });
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        }
    }
}
</script>

<style>

</style>