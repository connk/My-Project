<template>
    <div class="act">
        <div class="banner-pig">
            <img src="@/assets/img/act/bargain/banner.png" >
            <div class="banner-b shadow"></div>   
        </div>

        <div class="form-wrap shadow">
            <div class="cell-title"><span>300+</span>线下门店 售后无忧</div>
            <div class="cell address">
                <input type="text" v-model="form.cityName" @click="openChooseAdds()" readonly placeholder="请选择地区">
            </div>
            <van-popup v-model="show" position="bottom" :overlay="true">
                <van-area :area-list="areaList" @cancel="closePop" @confirm="confirmAds" :columns-num="2" title="选择城市"/>
            </van-popup>
            <div class="cell phone">
                <input type="text" v-model="form.appointmentTelephone" placeholder="请输入手机号">
            </div>
            <div class="cell">
                <div class="sub" @click="subConsultation()">立即咨询</div>
            </div>
        </div>

        <div class="car-list marg">
            <div class="title"></div>
            <div class="car-li shadow" v-for="(li, index) in carList" :key="index">
                <div class="car-img">
                    <div class="label">
                        <p>直降</p>
                        <p>6000</p>
                    </div>
                    <img class="car-img" v-lazy="li.image_path1">
                </div>
                <div class="car-info">
                    <div class="car-title">{{ li.car_name_cn }}</div>
                    <div class="car-tips">包上牌 \ 购置税 \ 赠1年保险</div>
                    <div class="car-price">首付<span>{{ li.down_payment*10000 }}</span>元</div>
                    <div class="car-btn" @click="bargain(index)">发起砍价</div>
                </div>
            </div>
        </div>

        <!-- <div class="hot-car marg">
            <img src="@/assets/img/act/bargain/hot-car.png">
        </div> -->

        <div class="download-app marg" @click="goDownLoad()">
            <img src="@/assets/img/act/bargain/download-app.png">
        </div> 

        <div class="foot-pig">
            <img src="@/assets/img/act/bargain/bottom.png">
        </div>


        <van-dialog
            v-model="showDialog"
            show-cancel-button
            :before-close="beforeClose"
            >
            <van-field
                v-model="user.phone"
                type="number"
                label="手机号"
                placeholder="请输入手机号"
            />
            <van-cell-group>
            <van-field
                v-model="user.code"
                center
                clearable
                label="短信验证码"
                placeholder="请输入验证码"
            >
                <van-button slot="button" size="small" :disabled="sendCodeText != '发送验证码'" @click="sengCode" type="primary">{{ sendCodeText }}</van-button>
            </van-field>
            </van-cell-group>
        </van-dialog>

    </div>
</template>

<script>
import areaList from '@/assets/js/areaList.js';
import { Toast } from 'vant';
import { Dialog } from 'vant';


export default {
    name: 'bargain',
    data() {
        return  {
            show: false,
            showDialog: false,
            sendCodeText: '发送验证码',
            facNo: '',//设备号
            bargainUserId: null,//用户id
            areaList: areaList,//城市列表
            webInfo:{//网站标题信息
                activityTitle: '***'
            },
            user: {//用户登录信息
                phone: '',
                code: ''
            },
            form: {//立即咨询提交信息
                activeName: '活动',
                fromType: '4',
                provinceName: '',
                cityName: '',
                cityCode: '',
                appointmentTelephone: '',
                activeType: '0',
                platformRemark: '活动备注'
            },
            carList: []//车列表
        }
    },
    created() {
        (function(root) {
            root._tt_config = true;
            var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
            ta.src = document.location.protocol + '//' + 's1.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js';
            ta.onerror = function () {
                var request = new XMLHttpRequest();
                var web_url = window.encodeURIComponent(window.location.href);
                var js_url  = ta.src;
                var url = '//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url + '&convert_id=1617730347849757';
                request.open('GET', url, true);
                request.send(null);
            }
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ta, s);
        })(window);
    },
    mounted() {
        let that =this;
        that.facNo = that.$store.state.facNo;//当前用户设备号
        
        that.getWebInfo();//获取网站信息
        that.getCarList(19);//获取车列表

        if(that.$store.state.userInfo){
            that.bargainUserId = that.$store.state.userInfo.userVo.telphone;
            that.getUserInfo();
        }

        if(localStorage.getItem('nowDay') != new Date().getDate()){
            that.statistics(0);
            localStorage.setItem('nowDay',new Date().getDate())
        }










    },
    methods: {
        beforeClose(action, done){
            if (action === 'confirm') {
                done(false);
                let that = this;
                if(that.user.phone.length != 11){
                    Toast.fail('请输入正确手机号');
                    return false;
                }
                if(!that.user.code){
                    Toast.fail('请输入验证码');
                    return false;
                }
                that.$post('/statistical/login/telphone_codes',{
                    telphone: that.user.phone,
                    code: that.user.code
                }).then((res) => {
                    console.log(res);
                    if(res.code == 0){
                        Toast.success('登录成功');
                        if(res.data){
                            that.$store.commit('setUserInfo',res.data);
                            done();
                        }
                    }
                    else{
                        Toast.fail(res.msg);
                    }
                })
            } else {
                done();
            }
            console.log(action);
        },
        sengCode(){//发送验证码
            let that = this;
            if(that.user.phone.length != 11){
                Toast.fail('请输入正确手机号');
                return false;
            }
            that.$get('/user/sendTelCode/' + that.user.phone,{}).then((res) => {
                console.log(res);
                if(res.code == 0){
                    Toast.success('发送成功');
                    let second = 60;
                    that.sendCodeText = second + '秒后重试';
                    
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                            that.sendCodeText = second + '秒后重试';
                        } else {
                            clearInterval(timer);
                            that.sendCodeText = '发送验证码';
                        }
                    }, 1000);
 
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        statistics(index){
            let that = this;

            var parms = {
                facNo: that.facNo,
                channelName: that.$route.query.channelName,
                moduleNo: index,
            }

            if(that.$store.state.userInfo){
                parms.userId = that.$store.state.userInfo.userVo.telphone
            }

            that.$post('/landing/page',parms).then((res) => {
                console.log('统计成功');
            })
        },
        bargain (index){//点击立即砍价
            let that = this;
            
            that.statistics(index+1);

            if(!that.$store.state.userInfo){
                that.showDialog = true;
                return false;
            }
            that.$post('/active/group_bargain_query',{
                facNo: that.facNo,
                bargainUserId: that.$store.state.userInfo.userVo.telphone
            }).then((res) => {
                console.log(res);
                if(res.code == 0){
                    let data = res.data;

                    let li = that.carList[index];
                    that.$store.commit('setTemporaryData',li);

                    if(data.bargainOrderId){
                        if(data.bargainOrderId == 0){//提交砍价了
                            that.$router.push({
                                path: '/act/bargain/invite'
                            });
                        }
                        else{
                            if(data.bargainOrderId.length > 19 ){//提车了
                                location.href = 'https://m.kooche.cn';
                            }
                            else{
                                that.$router.push({
                                    path: '/act/bargain/start'
                                });
                            }
                        }
                    }
                    else{
                        that.$router.push({
                            path: '/act/bargain/start'
                        });
                    }

                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        getUserInfo(){
            let that = this;
            that.$post('/active/group_bargain_query',{
                facNo: that.facNo,
                bargainUserId: that.$store.state.userInfo.userVo.telphone
            }).then((res) => {
                //console.log(res);
                if(res.code == 0){
                    let data = res.data;

                    if(data.bargainOrderId){
                        if(data.bargainOrderId == 0){//提交砍价了
                            that.$router.push({
                                path: '/act/bargain/invite'
                            });
                        }
                        else{
                            if(data.bargainOrderId.length > 19 ){
                                location.href = 'https://m.kooche.cn';
                            }
                            // else{
                            //     that.$router.push({
                            //         path: '/act/bargain/start'
                            //     });
                            // }
                        }
                    }
                    else{
                        // that.$router.push({
                        //     path: '/act/bargain/start'
                        // });
                    }
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        
        subConsultation () {//提交立即咨询
            var that = this;
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;//手机号正则验证

            if(that.form.cityName == ''){
                Toast.fail('请选择地区');
                return false;
            }
            if(!myreg.test(that.form.appointmentTelephone)){
                Toast.fail('请输入正确手机号');
                return false;
            }

            that.form.orderType = '4';

            //console.log(that.form); 

            that.$post('/active/activityorder',that.form).then((res) => {
                 _taq.push({convert_id: "1617730347849757", event_type: "form"})
                //console.log(res);
                if(res.code == 0){
                    Toast.success('提交成功！');
                    that.form = {
                        activeName: '活动',
                        fromType: that.$route.query.channelName,
                        provinceName: '',
                        cityName: '',
                        appointmentTelephone: '',
                        activeType: '0',
                        platformRemark: '活动备注'
                    };
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        getWebInfo(){//获取网站信息
            let that = this;
            that.$post('/statistical/query/activity_title',{
                activityUrl: window.location.href
            }).then((res) => {
                //console.log(res);
                if(res.code == 0){
                    if(res.data[0]){
                        that.webInfo.activityTitle = res.data[0].activityTitle;
                        that.form.activityTitle = res.data[0].activityTitle;
                        document.title = that.webInfo.activityTitle
                    }
                    else{
                        
                    }
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        openChooseAdds (){
            this.show = true;
        },
        closePop(){
            this.show = false;
        },
        confirmAds (el){
            //console.log(el);
            this.form.provinceName = el[0].name;
            this.form.cityName = el[1].name;
            this.form.cityCode = el[1].code;
            this.show = false;
        },
        getCarList (type){//获取车列表
            let that = this;
            that.$get('/car/category/' + type,{}).then((res) => {
                //console.log(res);
                if(res.code == 0){
                    that.carList = res.data;
                }
                else{
                    Toast.fail(res.msg);
                }
            })
        },
        goDownLoad (){
            let URL  = null;
            let u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                //安卓手机
                URL = 'https://mobiles.kooche.cn/android/kooche.apk';
            } else if (u.indexOf('iPhone') > -1) {
                //苹果手机
                URL = 'https://itunes.apple.com/cn/app/%E9%85%B7%E8%BD%A6%E4%BA%91/id1357524632?mt=8';
            } else if (u.indexOf('Windows Phone') > -1) {
                //winphone手机
                URL = 'https://itunes.apple.com/cn/app/%E9%85%B7%E8%BD%A6%E4%BA%91/id1357524632?mt=8';
            } 
            window.open(URL);
        }
    }
}
</script>

<style>


</style>