<template>
    <div>
      <van-nav-bar
  title="用户登录"
  left-text="返回"
  right-text="首页"
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
            <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
import url from '@/serviceAPI.config.js'
    export default {
        created(){
    if(localStorage.userInfo){
            Toast.success('您已经登录')
            this.$router.push('/')
    }
},
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
      this.$router.push('/personal')
    },
     axiosloginUser(){
         this.openLoading=true
          axios({
              url:url.login,
              method:"post",
              data:{
                  userName:this.username,
                  password:this.password
              }
            
          }).then(Response=>{
            
           
           
            if(Response.data.code==200 && Response.data.message){
                 new Promise((resolve,reject)=>{
        localStorage.userInfo={userName:this.username}
        setTimeout(()=>{
            resolve()
        },500)
}).then(()=>{
        Toast.success('登录成功')
        this.$router.push('/personal')
}).catch(err=>{
        Toast.fail('登录状态保存失败')
        console.log(err)
})
            Toast.success('登录成功')
            this.$router.push('/personal')
        }else{
            Toast.fail('登录失败')
            this.openLoading = false
        }
         this.openLoading=false
             
          }).catch(error=>{
              console.log(error)
                Toast.fail('登录失败')
             
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
     loginAction(){
    this.checkfrom() && this.axiosloginUser()
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