<template>
    <div>
        <div class="error">
         <img :src="error404" alt="" width="100%" height="100%">
        </div>
   
    </div>
</template>

<script>
    export default {
        data () {
            return {
                error404:require('@/assets/images/error.png')
            }
        },
        
    }
</script>

<style scoped>
.error>img{width: 100%;height: 100%;vertical-align: middle;}
</style>