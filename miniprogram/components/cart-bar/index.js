import orderApi from "../../api/order"

// components/chart/index.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsCart: {
      type: Array,
      value: []
    },
    storeList: ''
  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: false,
  },
  lifetimes: {
    attached() {
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickBag() {
      this.setData({
        showList: !this.data.showList
      })
    },
    reduceNumber(e) {
      const goods = e.currentTarget.dataset.goods
      goods.number -= 1
      this.triggerEvent('goodsReduce', goods)
    },
    addNumber(e) {
      const goods = e.currentTarget.dataset.goods
      goods.number += 1
      this.triggerEvent('goodsAdd', goods)
    },
    settlement() {
      if(this.properties.goodsCart.length === 0 || this.properties.goodsCart[this.properties.goodsCart.length-1] === 0) {
        wx.showToast({
          title: '购物车暂无商品',
          icon: 'error',
          duration: 2000,
          mask: true
        })
      }
      else{
        let list = []
        let pic = []
        let number = 0
        let goodsCart = this.properties.goodsCart
        const storeList = this.properties.storeList
        list['price'] = goodsCart[goodsCart.length-1]
        goodsCart.splice(-1,1)
        goodsCart.forEach(item => {
          pic = pic.concat(item.cover)
          number += item.number
        })
        var nowtime = new Date().getTime()
        list['shop_name'] = storeList.storeName
        list['state'] = '已完成'
        list['pic'] = pic
        list['time'] = nowtime
        list['number'] = number
        const goodsOrder = list
        orderApi.create({goodsOrder}).then(res => {
          wx.switchTab({
            url: '/pages/order/index',
            success: function(e) {
              var page = getCurrentPages().pop()
              page.onLoad()
            }
          })
        })
      }
    }
  }
})
