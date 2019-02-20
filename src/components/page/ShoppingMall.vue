<template>
  <div>
    <div>
      <van-row class="header" type="flex" justify="space-around">
        <van-col span="3">
          <img :src="maps" alt width="90%">
        </van-col>
        <van-col span="14">
          <input type="text" class="ipt">
        </van-col>
        <van-col span="5">
          <van-button type="primary" widht="100%" size="small" class="btn">搜索</van-button>
        </van-col>
      </van-row>
    </div>
    <!--  轮播图-->
    <div class="banner">
    <van-swipe :autoplay="3000">
  <van-swipe-item v-for="(banner, index) in bimg" :key="index">
    <img :src="banner.image" width="100%" height="100%"/>
  </van-swipe-item>
</van-swipe>
    </div>
    <div class="flex_radius">
      <div class="flex_radius_box" v-for="(radius_box,index) in rbox">
       <img :src="radius_box.image" alt="" width="90%">
         <span class="font_span3">{{radius_box.mallCategoryName }}</span>

      </div>
     

    </div>
    <!-- index_banner -->
      <div class="index_banner">
          <img v-lazy="index_banner" alt="" width="100%">

       </div>
       <div class="bd_color">
      <div class="recommended">
        商品推荐
     </div>
    <div class="recommendeds_content">
       <swiper :options="swiperOption" class="swiper-wrap" v-if="recommendeds_content.length>0">

  <swiper-slide  v-for="(recommendeds,index) in recommendeds_content" :key="index" >

    <img :src="recommendeds.image" alt="" width="100%"/>
     <span class="font_span1">¥ {{recommendeds.mallPrice | moneyfilter}} </span>
    <span class="font_span2"><del> {{ recommendeds.price | moneyfilter}} </del> </span>
  </swiper-slide>

</swiper>


   <flooters :flooterdata="flooters1" :floorTitle=floorName.floor1> </flooters>
    
    <flooters :flooterdata="flooters2" :floorTitle="floorName.floor2"> </flooters>
   
 <flooters :flooterdata="flooters3" :floorTitle="floorName.floor3"> </flooters>
     
      <!--Hot Area-->
<div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
        <van-list>
            <van-row gutter="20" style="margin:0">
                <van-col style="padding:0" span="12" v-for="( item, index) in hotGoods" :key="index">
                    <goodslist :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" :goodsId="item.goodsId"> </goodslist>
                </van-col>
            </van-row>
        </van-list>
    </div>
</div>

    </div>
   

       </div>
     
    
  </div>
</template>

<script>
import axios from "axios";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import flooters from '../component/flooters'
import {moneys} from '@/filter/moneyfilter.js'
import goodslist from '../component/goodslist'
import url from '@/serviceAPI.config.js'
export default {
  name: "ShoppingMall",
  data() {
    return {
      maps: require("../../assets/images/map.png"),
      bimg: [],
      rbox:[],
      index_banner:"",
      recommendeds_content:[],
      flooters1:[],
      flooters1_1:{},
      flooters1_2:{},
      flooters1_3:{},
        flooters2:[],
          flooters3:[],
          floorName:{},
           hotGoods:[],
 swiperOption: {
    loop: true,
      slidesPerView : 3,
  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    }

 }
    };
  },
   filters:{
     moneyfilter(money){
        return moneys(money)
     }
   },
  components: {
     swiper, swiperSlide,flooters,goodslist
  },
  created() {
    axios({
      url:url.getshopping_index,
      method: "get"
    }).then(Response => {
        if (Response.status == 200 && Response.status !=="") {
          this.bimg = Response.data.data.slides;
          console.log(Response);
          this.rbox=Response.data.data.category
          this.index_banner=Response.data.data.advertesPicture.PICTURE_ADDRESS
          this.recommendeds_content=Response.data.data.recommend
          this.flooters1=Response.data.data.floor1
          this.flooters2=Response.data.data.floor2
          this.flooters3=Response.data.data.floor3
          this.floorName=Response.data.data.floorName
          this.hotGoods=Response.data.data.hotGoods
        }
      }).catch(error => {
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  width: 100%;
  background-color: #e5017d;
  display: flex;
  align-items: center;
  
}
.ipt {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: oldlace 1px solid;
   width: 100%;
  display: inline-block;
  background-color: #e5017d;
}
.btn{width: .6rem;}
.banner{width: 100%;text-align: center;overflow: hidden;}
.flex_radius{  background-color: #fff;
     
    
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content: space-around;width: 100%}
.flex_radius_box{text-align: center;direction: flex;flex: 1}

.index_banner{width: 100%}
.bd_color{ background-color: #fff; }
.recommended{color: deeppink; padding-left: .213333rem}
.font_span1{text-align: center;font-size: .24rem;display: block;color: red}
.font_span2{opacity: .8; font-size: .186667rem;text-align: center;display: block;}
.hot-title{ color: #e5017d;  height: .8rem;
    width: 100%;   line-height:.8rem;
    background: #F5F5F5;}
.hot-area{
      text-align: center;
       font-size: .266667rem;
       width: 100%;
    
   
  }
.hot-goods{
  margin-bottom:.266667rem
}
.font_span3{font-size: .24rem}


@media screen and (min-width: 640px) {
   
.hot-goods{
  margin-bottom:.333333rem
}
}
</style>
