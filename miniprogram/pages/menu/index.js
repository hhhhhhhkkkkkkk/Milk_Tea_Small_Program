// pages/menu/index.ts
import swiperApi from "../../api/swiper"
import goodsApi from "../../api/goods"
import goodsCategoryApi from "../../api/goods-category"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerStyle: '',
    storeList: '',
    swiperList: [],
    goodsList: [],
    currentCategoryIndex: 0,
    sidebarCurrent: 0,
    goodsDetail: [],
    goodsCart:[],
    goodsDialogShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      storeList: options
    })
    this.makeHeaderStyle();
    this.fetchSwiperList();
    this.fetchData();

  },
  goodsDialogShow(e) {
    const goodsDialogShow = e.detail
    this.setData({
      goodsDialogShow
    })
  },
  goodsCart(e) {
    let list = e.detail
    let totalPrice = 0
    list.forEach((item, index) => {
      totalPrice += item.price * item.number
    })
    list = list.concat(totalPrice)
    this.setData({
      goodsCart: list
    })
  },
  goodsAdd(e) {
    const list = e.detail
    let goods = this.data.goodsCart
    let totalPrice = 0
    goods.splice(goods.length-1,1)
    goods.forEach((item, index) => {
      if(item.name === list.name && item.specs[0] === list.specs[0]) {
        goods[index] = list
      }
    })
    goods.forEach((item, index) => {
      totalPrice += item.price * item.number
    })
    goods = goods.concat(totalPrice)
    this.setData({
      goodsCart: goods
    })
  },
  goodsReduce(e) {
    const list = e.detail
    let goods = this.data.goodsCart
    let totalPrice = 0
    if(list.number !== 0){
      goods.splice(goods.length-1,1)
      goods.forEach((item, index) => {
        if(item.name === list.name && item.specs[0] === list.specs[0]) {
          goods[index] = list
        }
      })
      goods.forEach((item, index) => {
      totalPrice += item.price * item.number
      })
      goods = goods.concat(totalPrice)
      this.setData({
        goodsCart: goods
      })
    }
    else {
      goods.splice(goods.length-1,1)
      goods.forEach((item, index) => {
        if(item.name === list.name && item.specs[0] === list.specs[0]) {
          goods.splice(index, 1)
        }
      })
      goods.forEach((item, index) => {
      totalPrice += item.price * item.number
      })
      goods = goods.concat(totalPrice)
      this.setData({
        goodsCart: goods
      })
    }
  },
  goodsDetail(e) {
    const list = e.detail
    this.setData({
      goodsDetail: list
    })
  },
  onSideBarChange(e) {
    this.setData({
      currentCategoryIndex: e.detail.index
    })
  },
  onGoodsListChange(e) {
    this.setData({
      sidebarCurrent: e.detail.index
    })
  },
  fetchData() {
    goodsApi.listWithCategory().then(res=>{
      this.setData({
        goodsList: res.result
      })
    })
  },
  fetchSwiperList() {
    swiperApi.list().then(res=>{
      this.setData({
        swiperList: res.data
      })
    })
  },
  makeHeaderStyle() {
    const { top, bottom, height } = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = top + height/2
    const headerStyle = 'margin-top: calc(' + menuButtonCenterPoint + 'px - 32rpx);'
    this.setData({
      headerStyle: headerStyle
    })
  },
  switchCurrentStore() {
    this.setData({
      storeList: ''
    })
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