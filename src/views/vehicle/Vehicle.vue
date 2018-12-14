<template>
    <div class="vehicle">

        买酷车
    

    </div>
</template>

<script>

import { Toast } from 'vant';
export default {
    name: 'vehicle',
    data() {
        return  {
            
        }
    },
    created() {
        this.$emit('setActive', 1);
    },
    mounted() {


    },
    methods: {
        getBannerList: function () {
            var that = this;
            this.$get('/banner/list/深圳/5/0').then((res) => {
                if(res){
                    that.bannerList = res;
                }
            })
        }
    }
}
</script>

<style>

</style>