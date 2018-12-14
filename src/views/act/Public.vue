<template>
    <div class="public">

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>

        

    </div>
</template>

<script>
export default {
    name: 'public',
    data() {
        return  {
            
        }
    },
    created: function () {

    },
    mounted() {

    },
    methods: {
       
    }
}
</script>

<style>
 @import '../../assets/css/act.css';

</style>
