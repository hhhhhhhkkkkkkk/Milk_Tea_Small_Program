import storeApi from "../../api/store"
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const computedBehavior = require('miniprogram-computed').behavior
// pages/store/index.js
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.2725,
    longitude: 113.2076,
    storeList: [],
    dict: {
      'OPENING': '营业中',
      'CLOSED': '已停业'
    },
    storeDetailShow: false,
    currentStore: null,
    collapse: false
  },
  computed: {
    markers(data) {
      const storeList = data.storeList
      return storeList&&storeList.map((item, index) =>{
        return {
          id: index + 1,
          title: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          iconPath: '../../assets/images/marker.png',
          width: '90rpx',
          height: '100rpx'
        }
      })
    },
  },
  mapSdk: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadCurrentLocation()
  },
  pupupStoreDetail(e) {
    const { store } = e.currentTarget.dataset
    this.setData({
      storeDetailShow: true,
      currentStore: store
    })
  },
  collapse() {
    this.setData({
      collapse: !this.data.collapse
    })
  },
  async loadCurrentLocation() {
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
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        that.fetchStoreList()
      }
    })
  },
  fetchStoreList() {
    console.log(this.data.longitude, this.data.latitude)
    storeApi.list(this.data.longitude, this.data.latitude).then(res=>{
      const storeList = this.makeStoreList(res.data)
      this.setData({
        storeList: storeList
      })
    })
  },
  makeStoreList(storeList) {
    const locationList = storeList.map(item =>{
      return {
        latitude: item.latitude,
        longitude: item.longitude
      }
    })
    this.mapSdk.calculateDistance({
      from: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      to: locationList,
      success: (res) => {
        storeList.forEach((item, key) =>{
          storeList[key]['distance'] = (res.result.elements[key].distance / 1000).toFixed(2)
        })
        this.setData({
          storeList
        })
      },
      fail: (res) =>{
        storeList.forEach((item, key) =>{
          storeList[key]['distance'] = (res.result.elements[key].distance / 1000).toFixed(2)
        })
        this.setData({
          storeList
        })
      }
    })
  },
  goToCurrentLocation() {
    this.mapCtx = wx.createMapContext('store-map')
    this.mapCtx.moveToLocation()
    this.loadCurrentLocation()
  },
  onMarkerTab(e) {
    const { markerId } = e.detail
    const store = this.data.storeList[markerId-1]
    this.setData({
      storeDetailShow: true,
      currentStore: store
    })
  },
  poiTap(e) {
    const poi = e.detail
    this.setData({
      latitude: poi.latitude,
      longitude: poi.longitude
    })
    this.fetchStoreList()
  },
  navigateLocation(e) {
    const location = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      address: location.address
    })
  },
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  goToMenu(e) {
    const storeList = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/menu/index?storeName=${storeList.storeName}&storeDistance=${storeList.storeDistance}`,
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
    this.setData({
      storeDetailShow: false
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