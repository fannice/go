<template>
    <div>
         <div class="floor-title"> {{floorTitle}} </div>
   <div class="flooters1">
      <div class="flooters1_1" >
       <img :src="flooterdata0.image" alt="" width="100%">
      </div>
      <div class="flooters1_right">

<div class="flooters1_2" >
       <img :src="flooterdata1.image" alt="" width="100%">
      </div>
      <div class="flooters1_3" >
       <img :src="flooterdata2.image" alt="" width="100%">
      </div>

      </div>
      

   </div>

  <div class="flooters1_4">
         <div v-for="(flooters1_4,index) in flooterdata.slice(3)" :key="index">
          <img :src="flooters1_4.image" alt="" width="100%">

      </div>
 
      </div>

      
    </div>
</template>

<script>
    export default {
        props: ["flooterdata","floorTitle"],
        data () {
            return {
               flooterdata0:{},
                flooterdata1:{},
                flooterdata2:{}
            }
        },
        watch: {
           flooterdata:function(val){
               this.flooterdata0=this.flooterdata[0]
               this.flooterdata1=this.flooterdata[1]
               this.flooterdata2=this.flooterdata[2]
           }  
        }
    }
</script>

<style scoped>
.flooters1{width: 100%;display: flex;justify-content: space-around;flex-flow: flow;width: 100%}
.flooters1_1{border: 1px solid #dddddd;border-left: none;border-top: none}
.flooters1_right{display: flex;flex-direction: column;}
.flooters1_2,.flooters1_3{border-bottom: 1px solid #dddddd;}
.flooters1_4{display: flex;clear: both;border-bottom: 1px #dddddd solid}
.flooters1_4>div:nth-child(1){border-right: 1px solid #dddddd}
.floor-title{
 display: flex;align-items: center;justify-content: center;font-size: .266667rem;height: .8rem; width: 100%;background: #F5F5F5  ;color:#e5017d
  }
</style>