// pages/me/index.ts
const computedBehavior = require('miniprogram-computed').behavior
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    user: null
  },
  computed: {
    desensitiveMobile(data) {
      if(!data.user) {
        return ''
      }
      let mobile = data.user.phone_number
      if(mobile) {
        mobile = mobile.replace(/^(\d{3})\d{6}(\d{2})$/, "$1******$2")
      }
      return mobile
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },
  login() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  unfinished() {
    wx.showToast({
      title: '敬请期待',
      icon: 'error',
      duration: 2000,
      mask: true
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
    if(!this.data.user){
      const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    }
  },
  gotoCustomPage(e) {
    const {code} =e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/custom-page/index?code=${code}`,
    })
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