<template>
    <div>
  <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>

<div class="height_m">
    <van-row>
        <van-col span="6">
            <div id="leftNav">
    <ul>
        <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">
            {{item.MALL_CATEGORY_NAME}}
        </li>
    </ul>
</div>
        </van-col>
        <van-col span="18">

<div class="tabCategorySub" >
    <van-tabs v-model="active" @click="onClickCategorySub">
        <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
        </van-tab>
    </van-tabs>
</div>

<div id="list-div">
     <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
    <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        >
        <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodList" :key="index">
            <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
        <div class="list-item-text">
            <div class="font_text">{{item.NAME}}</div>
            <div class="">￥{{item.ORI_PRICE | moneyfilter}}元</div>
        </div>
        </div>
    </van-list>
 </van-pull-refresh>

    
</div>



        </van-col>
    </van-row>
</div>

    </div>
</template>

<script>
import {moneys} from '@/filter/moneyfilter.js'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        created() {
           
           this.getCategory()
         
        },
        mounted () {
             let winHeight = document.documentElement.clientHeight
    document.getElementById("leftNav").style.height= winHeight-46 +'px'
      document.getElementById('list-div').style.height=winHeight-90 +'px'
        },
        filters:{
           moneyfilter(money){
              return moneys(money)  
           }
        },
        data () {
            return {
                category:[],
                  categoryIndex:0, 
                  categorySub:[],
                  active:0,
                  loading:false,
                  finished:false,
                  list:[],
                   isRefresh:false, //下拉加载
                    page:1,          //商品列表的页数
        goodList:[],     //商品信息
        categorySubId:'', //商品子分类ID
        errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   , 
            }
        },
         methods: {
             getCategory() {
    axios({
        url:url.getCategoryList,
        method:'get',
    })
    .then(response=>{
        console.log(response)
        if(response.data.code == 200 && response.data.message ){
          this.category=response.data.message
            this.getCategorySubByCategoryId(this.category[0].ID)
        }else{
            Toast('服务器错误，数据取得失败')
        }
    })
    .catch(error=>{
        console.log(error)
    }) 
},
//点击大类的方法
clickCategory(index,categoryId){
    this.categoryIndex=index
    this.page=1
        this.finished = false
        this.goodList=[]
    this.getCategorySubByCategoryId(categoryId)
},
//根据大类ID读取小类类别列表
getCategorySubByCategoryId(categoryId){
    axios({
        url:url.getCategorySubList,
        method:'post',
        data:{categoryId:categoryId}
    })
    .then(response=>{
        console.log(response)
        if(response.data.code == 200 && response.data.message ){
            this.categorySub=response.data.message
            this.active = 0
          this.categorySubId= this.categorySub[0].ID
          this.onLoad()
        }else{
            Toast('没有找到内容！')
        }  
    })
    .catch(error=>{
        console.log(error)
    }) 
},
onLoad(){
   setTimeout(()=>{
        this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
        this.getGoodList()
    },1000)
},
onRefresh(){
    setTimeout(() => {
      this.isRefresh = false;
        this.finished = false;
        this.goodList=[];
        this.page=1
        this.onLoad()
    }, 500);
},
getGoodList(){
        axios({
        url:url.getGoodsListByCategorySubID,
        method:'post',
        data:{
                categorySubId:this.categorySubId,
                page:this.page
            }
    })
    .then(response=>{
        console.log(response)
        if(response.data.code == 200 && response.data.message.length ){
            this.page++
            this.goodList=this.goodList.concat(response.data.message)
        }else{
                this.finished = true;
        }
        this.loading=false;
        console.log(this.finished)
    })
    .catch(error=>{
        console.log(error)
    })
},
onClickCategorySub(index,title){
    //console.log( this.categorySub)
    this.categorySubId= this.categorySub[index].ID
    console.log(this.categorySubId)
    this.goodList=[]
    this.finished = false
    this.page=1
    this.onLoad()
},
goGoodsInfo(id){
    this.$router.push({name:'goods',params:{goodsId:id}})
}
     
         }
    }
</script>

<style scoped>
#leftNav{
    background-color: aliceblue
}
#leftNav ul li {
    line-height: 1.5rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
   
    text-align: center;
    font-size: .266667rem
}
.categoryActive{
    background-color: #fff;
}
  .list-item{
        
        text-align: center;
        line-height: 1.066667rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        display: flex;
        justify-content: flex-start;
        align-items: center
    }
    #list-div{
        overflow: scroll;

    }
 .list-item-img{
         
         
        height: 100%;
        display: block;
         line-height: 1.066667rem;
         display: flex;
         align-items: center
    }
     .list-item-img>img{
         width: 2rem;
         display: block;
     }
    .list-item-text{
        
        margin-top:.133333rem;
        margin-left:.133333rem;
        
    }
  
    .font_text{text-overflow:ellipsis;white-space: nowrap;width: 5rem;overflow: hidden;font-size:.32rem}
    .height_m{padding-bottom: 1.333333rem}
</style>