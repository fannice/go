<template>
    <div>
      <van-nav-bar
  title="用户注册"
  left-text="返回"
  right-text="登录"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>


   <div>
  <van-field
    v-model="username"
    required
    clearable
    label="用户名"
    right-icon="question-o"
    placeholder="请输入用户名"
    @click-right-icon="username=''"
     :error-message="usernameErrorMsg"
  />

  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
    :error-message="passwordErrorMsg"
  />
   </div>
    <div class="register-button">
            <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        data () {
            return {
              username:"",
              password:"",
              openLoading:false,
              usernameErrorMsg:'',   //当用户名出现错误的时候
              passwordErrorMsg:'',   //当密码出现错误的时候 
            }
        },
         methods: {
    onClickLeft() {
        this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push('/login')
    },
     axiosRegisterUser(){
         this.openLoading=true
          axios({
              url:url.registerUser,
              method:"post",
              data:{
                  userName:this.username,
                  password:this.password
              }
            
          }).then(Response=>{
              console.log(Response)
              if(Response.data.code==200 && Response.data.code!==""){
                  Toast.success('注册成功');
                  this.$router.push('/login')
              }else{
                   
            Toast.success('注册失败');
            this.openLoading=false
           
              }
          }).catch(error=>{
              console.log(error)
              
               Toast.success('注册失败');
               this.openLoading=false
               
          })


     },
     checkfrom(){
          let isOk= true
         if(this.username.length<5){
             this.usernameErrorMsg="用户名不能少于5位数"
              isOk= false
         }else{
              this.usernameErrorMsg=""
         }
         if(this.password.length<6){
             this.passwordErrorMsg="密码不能少于6位数字"
              isOk= false

         }else{
             this.passwordErrorMsg=''
         }
         return isOk
     },
     registerAction(){
    this.checkfrom() && this.axiosRegisterUser()
},
  }
    }
</script>

<style scoped>
.register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    
</style>