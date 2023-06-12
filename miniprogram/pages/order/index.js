import orderApi from "../../api/order"

// pages/order/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.allOrder()
  },
  shopGoods() {
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  allOrder() {
    orderApi.order().then(res => {
      const orders = res.data
      orders.forEach(item => {
        item.time = this.formatDate(orders[0].time)
      })
      this.setData({
        orders
      })
    })
  },
  formatDate: function (times) {
    var date = new Date(times)
    var year = date.getFullYear()
    var month = function() {
      return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    }
    var day = function() {
      return date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    }
    var hour = function() {
      return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    }
    var minute = function() {
      return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }
    var second = function() {
      return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    }
    return year + '-' + month() + '-' + day() + ' ' + hour() + ':' + minute() + ':' + second()
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