<template>
    <div class="footnav">

        <router-view @setActive="setActive" />

        <van-tabbar v-model="active">
            <van-tabbar-item icon="home" to="/">买酷车</van-tabbar-item>
            <van-tabbar-item icon="cart" to="/vehicle">买酷车</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
export default {
    name: 'footnav',
    data() {
        return  {
            active: -1
        }
    },
    created: function () {

    },
    mounted() {

    },
    methods: {
        setActive(index) {
            this.active = index;
        }
    }
}
</script>

<style>
.footnav .van-tabbar{
    height: 3rem;
}
.footnav .van-tabbar-item{
    font-size: 0.76rem;
}
.footnav .van-tabbar-item--active {
    color: #36d5c7;
}
.footnav .van-tabbar-item__icon{
    font-size: 1.1rem;
}
</style>
