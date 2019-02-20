 const BASEURL="https://www.easy-mock.com/mock/5c025cc16574b14de00eb7bd/shopping_data/"
 const LOCALURL = "http://localhost:3000/"
const URL= {
  getshopping_index:BASEURL+'index_data', 
  registerUser:LOCALURL+"user/register",
  login:LOCALURL+'user/login',   //用户注册接口 
  getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',
  getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
  getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
  getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',   //得到小类商品信息
}


module.exports=URL