import storeApi from "../../api/store"
import swiper from "../../api/swiper"
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// pages/index/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    user: null,
    nearbyStore: null
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
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    swiper.list().then(res=>{
      this.setData({
        swiperList: res.data
      })
    })
  },
  onMenuCardClick() {
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  onArticleClick() {
    wx.navigateTo({
      url: '/pages/web-view/index?url=http://xhslink.com/g8WXln',
    })
  },
  onMagic() {
    wx.navigateTo({
      url: '/pages/web-view/index?url=https://haoxiaojia.taobao.com/shop/view_shop.htm?user_number_id=2011046266&ali_trackid=2%3Amm_340480137_491250339_108786550409%3A1676299523_092_711082736&union_lens=lensId%3ATAPI%401676299523%402105436b_0d46_1864b3cd58c_26ee%4001%3Brecoveryid%3A1676299523_092_711082736&ak=25010409&bxsign=tbk-fiIW4SeO_ntY9S2-d40yg7zy4Ur2bPBR-PVv83cdDwEiFqg8O8DObWVajfWgHwyBhuTXswDojQQyZz9u3fAwtnGw2FCnPnsM-8J2ezmEX3VMwumM22yj2IGmSElHy3H9aVH1S-r07AFjnXoz1rTfw',
    })
  },
  onShow() {
    if(!this.data.user){
      const user = wx.getStorageSync('user')
      this.setData({
        user
      })
    }
    let that = this
    this.mapSdk = new QQMapWX({
      key: 'QSLBZ-6E5YV-DDCPO-UKQJK-RO3NJ-IFBF3'
    })
    this.mapSdk.reverseGeocoder({
      location: '',
      success: function(res) {
        const result = res.result.location
        const latitude = result.lat
        const longitude = result.lng
        storeApi.list(longitude, latitude).then(res=>{
          !res.data.length || that.setData({nearbyStore: res.data[0].name})
        })
      }
    })
  },

  gotoLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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