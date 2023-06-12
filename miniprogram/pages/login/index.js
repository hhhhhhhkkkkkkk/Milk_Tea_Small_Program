import userApi from "../../api/user"
var app = getApp()
// pages/login/index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(getApp().isLogin()) {
      wx.navigateBack({
        delta: 0, 
      })
    }
  },
  login() {
    const phoneNumber = app.globalData.phoneNumber
    userApi.create({phoneNumber}).then(response=>{
      userApi.me().then(results=>{
        wx.setStorageSync('user', results.data[results.data.length-1])
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1000,
        success() {
          setTimeout(function () {
            wx.hideToast()
            wx.navigateBack({
              delta: 0, 
            })
          },1000)
        }
      })
    })
  },
  cancel() {
    wx.navigateBack({
      delta: 0, 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})