<template>
    <div class="my">
        <img src="@/assets/img/logo.png" alt="">

        我的
    

    </div>
</template>

<script>

export default {
    name: 'my',
    data() {
        return  {

        }
    },
    created() {
        this.$emit('setActive', 2);
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style>

</style>