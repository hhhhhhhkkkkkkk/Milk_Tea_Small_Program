import userApi from "./api/user"
// app.ts
App({
  globalData: {
    phoneNumber: '15649161163'
  },
  onLaunch() {
    if(!this.isLogin()){
      this.checkUser()
    }
    
    // 展示本地存储能力
  },
  isLogin() {
    return Boolean(wx.getStorageSync('user'))
  },
  checkUser() {
    wx.showLoading({
      title: '正在检查登录',
    })
    userApi.me().then(res=>{
      if(res.data.length) {
        for(var i=0; i<res.data.length; i++){
          if(res.data[i].phone_number === this.globalData.phoneNumber){
            wx.setStorageSync('user', res.data[0])
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }
        }
        
      }
      wx.hideLoading()
    })
  }
})