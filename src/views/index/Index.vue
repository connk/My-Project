<template>
    <div class="index">
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="banner">
                <van-swipe :autoplay="3000" indicator-color='#fff'>
                    <van-swipe-item v-for="(li, index) in bannerList" :key="index">
                        <router-link to="/vehicle">
                            <img v-lazy="li.imagePath1" />
                        </router-link>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="texttips">
                <van-row>
                    <van-col span="8">超低首付 便捷购车</van-col>
                    <van-col span="8">厂商直供 品质保证</van-col>
                    <van-col span="8">全国联保 省心售后</van-col>
                </van-row>
            </div>
            <div class="cell-wrap marg">
                <div class="product">
                    <van-row>
                        <van-col span="11">
                            <div class="product-li">
                                <router-link to="#">
                                    <img src="@/assets/img/index/product-li-1.png" >
                                    <p>超低首付</p>
                                </router-link>
                            </div>
                        </van-col>
                        <van-col span="2">
                            <div class="vertical-line"></div>
                        </van-col>
                        <van-col span="11">
                            <div class="product-li">
                                <router-link to="#">
                                    <img src="@/assets/img/index/product-li-2.png" >
                                    <p>超低月供</p>
                                </router-link>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="cell-wrap marg">
                <div class="cell-title">
                    <span>品牌推荐</span>
                    <span class="view-more">
                        <router-link to="#">查看更多</router-link>
                    </span>
                </div>
                <div class="brand">
                    <van-row >
                        <van-col span="6" v-for="(li, index) in brandList" v-if="index < 8" :key="index">
                            <img v-lazy="li.brandImage" >
                            <p>{{ li.brandNameCh }}</p>
                        </van-col>
                    </van-row>
                </div>
                <div class="screen">
                    <van-row >
                        <van-col span="6" v-for="(li, index) in filtrateList" v-if="index < 4" :key="index">
                            {{ li.name }}
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="cell-wrap marg">
                <div class="pig-product">
                    <van-row gutter="10">
                        <van-col span="12">
                            <div class="left">
                                <router-link to="#">
                                    <img src="@/assets/img/index/product-left.jpg" >
                                </router-link>
                            </div>
                        </van-col>
                        <van-col span="12">
                            <div class="right">
                                <router-link to="#">
                                    <img src="@/assets/img/index/product-right1.jpg" >
                                </router-link>
                            </div>
                            <div class="right">
                                <router-link to="#">
                                    <img src="@/assets/img/index/product-right2.jpg" >
                                </router-link>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="index-ad marg">
                <router-link to="#">
                    <img src="@/assets/img/index/discountcenter.png" >
                </router-link>
            </div>
            <div class="floor marg">
                <div class="floor-title">
                    <span class="title-text floor-t1">热销专区</span>
                    <span class="view-more">
                        <router-link to="#">查看更多</router-link>
                    </span>
                </div>
                <van-row gutter="10">
                    <van-col span="12" v-for="(li, index) in floorData[8]" v-if="index < 6" :key="index">
                        <router-link to="#">
                            <div class="floor-car-li">
                                <img class="car-img" v-lazy="li.image_path1">
                                <p class="car-name">{{ li.car_name_cn }}</p>
                                <p class="car-price">
                                    <span class="car-down-payment">首付 <span>{{ li.down_payment }} 万</span></span>
                                    <span class="car-month-payment">月供 {{ li.month_payment }} 元</span>
                                </p>
                            </div>
                        </router-link>
                    </van-col>
                </van-row>
            </div>
            <div class="floor marg">
                <div class="floor-title">
                    <span class="title-text floor-t1">新车专区</span>
                    <span class="view-more">
                        <router-link to="#">查看更多</router-link>
                    </span>
                </div>
                <van-row gutter="10">
                    <van-col span="12" v-for="(li, index) in floorData[9]" v-if="index < 6" :key="index">
                        <router-link to="#">
                            <div class="floor-car-li">
                                <img class="car-img" v-lazy="li.image_path1">
                                <p class="car-name">{{ li.car_name_cn }}</p>
                                <p class="car-price">
                                    <span class="car-down-payment">首付 <span>{{ li.down_payment }} 万</span></span>
                                    <span class="car-month-payment">月供 {{ li.month_payment }} 元</span>
                                </p>
                            </div>
                        </router-link>
                    </van-col>
                </van-row>
            </div>
            <div class="floor marg">
                <div class="floor-title">
                    <span class="title-text floor-t1">活动专区</span>
                    <span class="view-more">
                        <router-link to="#">查看更多</router-link>
                    </span>
                </div>
                <van-row gutter="10">
                    <van-col span="12" v-for="(li, index) in floorData[10]" v-if="index < 6" :key="index">
                        <router-link to="#">
                            <div class="floor-car-li">
                                <img class="car-img" v-lazy="li.image_path1">
                                <p class="car-name">{{ li.car_name_cn }}</p>
                                <p class="car-price">
                                    <span class="car-down-payment">首付 <span>{{ li.down_payment }} 万</span></span>
                                    <span class="car-month-payment">月供 {{ li.month_payment }} 元</span>
                                </p>
                            </div>
                        </router-link>
                    </van-col>
                </van-row>
            </div>
            <div class="floor marg">
                <div class="floor-title">
                    <span class="title-text floor-t2">猜你喜欢</span>
                    <span class="view-more">
                        <router-link to="#">查看更多</router-link>
                    </span>
                </div>
                <van-row gutter="10" style="height:19.6rem">
                    <van-col span="12" v-for="(li, index) in floorData.youLive" v-if="index < 6" :key="index">
                        <router-link to="#">
                            <div class="floor-car-li">
                                <img class="car-img" v-lazy="li.image_path1">
                                <p class="car-name">{{ li.car_name_cn }}</p>
                                <p class="car-price">
                                    <span class="car-down-payment">首付 <span>{{ li.down_payment }} 万</span></span>
                                    <span class="car-month-payment">月供 {{ li.month_payment }} 元</span>
                                </p>
                            </div>
                        </router-link>
                    </van-col>
                </van-row>
            </div>
            <div class="cell-wrap marg">
                <div class="cell-title">
                    <span>车主晒单</span>
                </div>
                <div class="buyer-info">
                    <van-swipe :width="260" :show-indicators="false">
                        <van-swipe-item v-for="(li, index) in buyerInfo" :key="index">
                            <router-link to="/#">
                                <div class="buyer-info-li">
                                    <div class="img">
                                        <img v-lazy="li.imagePath1" />
                                        <p>{{ li.appraise }}</p>
                                    </div>
                                    <p class="buyer-text">
                                        <span>{{ li.buyAddress }}</span>
                                        <span>{{ li.buyTime }}</span>
                                    </p>
                                    <p class="buyer-text">车型</p>
                                    <p class="buyer-text">{{ li.buyerFamilyName }}先生/{{ li.profession }}</p>
                                </div>
                            </router-link>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                
            </div>


        </van-pull-refresh>
    </div>
</template>

<script>

import { Toast } from 'vant';


export default {
    name: 'index',
    data() {
        return  {
            isLoading: false,
            bannerList: [],
            brandList: [],
            filtrateList: [],
            floorData:{
                '8':[],
                '9':[],
                '10':[],
                youLive:[]
            },
            buyerInfo:[]

        }
    },
    created() {
        this.$emit('setActive', 0);
    },
    mounted() {
        //this.refresh(); 



        // var sss = this.$getCode('safdas');


        // var ms = {
        //     pwd:555,
        //     pas:54545
        // }


        // var sd = this.$getSign(sss);

        //console.log(sss);



        //let a = ext.en(11)
        //let b = ext.de(a)


        //console.log(a,'加密后的结果')
        //console.log(b,'解密后的结果')







    },
    methods: {
		onRefresh() {
            this.refresh();
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 600);
		},
		refresh() {
			this.getBannerList();
			this.getBrandList();
			this.getFiltrate();
			this.getFloorData(8);
			this.getFloorData(9);
			this.getFloorData(10);
			this.getYouLiveData();
            this.getBuyerInfo();
            
		},
        getBannerList() {
            var that = this;
            this.$get('/banner/list/深圳/5/0').then((res) => {
                if(res){
                    //console.log(res);
                    that.bannerList = res;
                }
            })
        },
        getBrandList() {
            var that = this;
            this.$get('/brand/list/1/8').then((res) => {
                if(res){
                    //console.log(res);
                    that.brandList = res;
                }
            })
        },
        getFiltrate() {
            var that = this;
            this.$get('/getFiltrate/with/1').then((res) => {
                if(res){
                    //console.log(res);
                    that.filtrateList = res;
                }
            })
        },
        getFloorData(type) {
            var that = this;
            this.$get('/car/category/' + type).then((res) => {
                if(res){
                    console.log(res);
                    that.floorData[type] = res;
                }
            })
        },
        getYouLiveData(){
            var that = this;
            this.$get('/carlist/all_all_pr0-*s0-*m0-*l20h1pc0pz10').then((res) => {
                if(res){
                    console.log(res);
                    that.floorData.youLive = res.records;
                }
            })
        },
        getBuyerInfo(){
            var that = this;
            this.$get('/buyerinfo/getList').then((res) => {
                if(res){
                    console.log(res);
                    that.buyerInfo = res;
                }
            })
        }

        

        

    }
}
</script>

<style>
.index{
    padding-bottom: 4rem;
	background: #f7f7f7;
}
.cell-wrap{
	background: #fff;
	border-radius: 0.6rem;
}
.view-more{
	float: right;
	font-size: 0.7rem;
	color: #A6A6A6;
}
.marg{
	margin: 0.7rem 0.7rem 0;
}
/* 轮播图 */
.index .banner{
    height: 10rem;
    background: #ccc;
}
.index .banner .van-swipe{
    height: 10rem;
}
.index .banner .van-swipe img{
    width: 100%;
    height: 100%;
}
.index .cell-title{
	height: 1.5rem;
	line-height: 1.5rem;
	padding: 0.5rem 0.8rem;
	border-bottom: 0.05rem solid #f7f7f7;
	font-size: 0.9rem;
	font-weight: bold;
}
/* 提示 */
.index .texttips{
    height: 1rem;
    line-height: 1rem;
    padding: 0.54rem 0.5rem;
    text-align: center;
    font-size: 0.62rem;
	background: #fff;
}
/* 产品位 */
.index .product{
	padding: 0.7rem;
}
.index .product .van-col{
	height: 3.8rem;
	text-align: center;
}
.index .product-li{
	width: 100%;
	height: 100%;
}
.index .product .vertical-line{
	width: 0.05rem;
	height: 100%;
	background: #f7f7f7;
}
.index .product-li img{
	width: 2.5rem;
	height: 2.5rem;
}
.index .product-li p{
	font-size: 0.7rem;
	line-height: 1rem;
}

/* 品牌 */
.index .brand{
    height: 8rem;
	padding: 0.5rem 0 0.3rem;
    overflow: hidden;
}
.index .brand .van-col{
	position: relative;
    height: 3.2rem;
	margin: 0.4rem 0;
	text-align: center;
}
.index .brand img{
    width: 2.3rem;
}
.index .brand p{
	width: 100%;
	height: 1.5rem;
	line-height: 1.5rem;
    font-size: 0.7rem;
	color: #A6A6A6;
	position: absolute;
	bottom: 0;
}
/* 首付筛选 */
.index .screen{
    height: 1.4rem;
    line-height: 1.4rem;
    padding: 0.4rem 0.5rem;
    text-align: center;
    font-size: 0.68rem;
	border-top: 0.05rem solid #f7f7f7;
}
/* 图片产品位 */
.index .pig-product{
	padding: 0.7rem;
}
.index .pig-product .van-col{
	height: 8.8rem;
	overflow: hidden;
}
.index .pig-product .left{
	width: 100%;
	height: 100%;
}
.index .pig-product .right{
	width: 100%;
	height: 4.2rem;
	margin-bottom: 0.4rem;
}
.index .pig-product img{
	width: 100%;
	height: 100%;
	border-radius: 0.3rem;
}
/* 广告banner图 */
.index .index-ad{
    height: 3.5rem;
    margin-bottom: 0.5rem;
	border-radius: 3.5rem;
	overflow: hidden;
}
.index .index-ad img{
	width: 100%;
    height: 100%;
	float: left;
}
/* 楼层列表 */
.index .floor{
	margin-bottom: 0.5rem;
}
.index .floor-title{
	height: 2rem;
	line-height: 2rem;
	margin-bottom: 0.7rem;
}
.index .floor-title .title-text{
	display: inline-block;
	width: 6.6rem;
	height: 2rem;
	line-height: 2rem;
	color: #fff;
	font-size: 0.9rem;
	border-radius: 1rem;
	padding-left: 2rem;
	box-sizing: border-box;
}
.index .floor-t1{
	background: #FB5756;
}
.index .floor-t2{
	background: #20CEB3;
}
.index .floor .van-row{
	height: 29.6rem;
	overflow: hidden;
}
.index .floor .van-col{
	height: 9.5rem;
	margin-bottom: 0.5rem;
}
.index .floor .floor-car-li{
	height: 100%;
	background: #fff;
	border-radius: 0.3rem;
	padding: 0 0.4rem;
}
.index .floor .floor-car-li .car-img{
	width: 92%;
	height: 5.5rem;
	margin: 0 4%;
}
.index .floor .floor-car-li .car-name{
    height: 2.2rem;
    line-height: 1.1rem;
	font-size: 0.75rem;
	margin-top: -0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.index .floor .floor-car-li .car-price{
	height: 1.2rem;
	line-height: 1.2rem;
	overflow: hidden;
	font-size: 0.6rem;
	padding: 0.2rem 0;
}
.index .floor .floor-car-li .car-down-payment{
	float: left;
}
.index .floor .floor-car-li .car-down-payment span{
	color: #ff6156;
}
.index .floor .floor-car-li .car-month-payment{
	color: #999;
	float: right;
}
/* 车主晒单 */
.index .buyer-info{
	height: 10rem;
	padding: 0.7rem;
} 
.index .buyer-info .van-swipe{
	height: 10rem;
}
.index .buyer-info-li{
	height: 100%;
	background: #F4F4F4;
	margin-right: 0.7rem;
	border-radius: 0.4rem;
	overflow: hidden;
} 
.index .buyer-info-li .img{
	width: 100%;
	height: 6.2rem;
	position: relative;
	margin-bottom: 0.4rem;
}
.index .buyer-info-li .img img{
	width: 100%;
	height: 100%;
}
.index .buyer-info-li .img p{
	position: absolute;
	bottom: 0.2rem;
	left: 0.5rem;
	right: 0.5rem;
	font-size: 0.7rem;
	height: 1.2rem;
	color: #fff;
	line-height: 1.2rem;
	overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.index .buyer-info-li .buyer-text{
	line-height: 1rem;
	font-size: 0.6rem;
	padding: 0 0.5rem;
	color: #A6A6A6;
}

</style>