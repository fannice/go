<template>
    <div>
 <div class="goods-info" @click="goodslist">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneysfilter }}</div>
    </div>
    </div>
</template>

<script>
import {moneys} from '@/filter/moneyfilter.js'
    export default {
        props:["goodsImage","goodsName","goodsPrice","goodsId"],
        data () {
            return {
                
            }
        },
        filters: {
            moneysfilter(money){
                return moneys(money)
            }
        },
        methods: {
            goodslist(){
                this.$router.push({name:"goods",query:{goodsId:this.goodsId}})
            }
        }
    }
</script>

<style scoped>
 .goods-name{
        padding: 0 8px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space:nowrap; 
    }
</style>