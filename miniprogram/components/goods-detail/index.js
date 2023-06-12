import specsCategoryApi from "../../api/specs-category"
import specsApi from "../../api/specs"

let list = []
// components/goods-detail/index.js
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    goodsDetail: {
      type: Object,
      value: null
    },
    goodsCart: {
      type: Object,
      value: null
    },
  },
  observers: {
    'goodsDetail' : function (goodsDetail){
      this.fetchSpecsCategories(goodsDetail.specs_categories)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    specsCategories: [],
    totalPrice: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async fetchSpecsCategories(categoryIds) {
      if(categoryIds){
        let list = []
        categoryIds.forEach(item => {
          const categoryId = item
           specsCategoryApi.category(categoryId).then(res => {
            const specsList = res.data[0].specs
            specsList.forEach((item, index) => {
              const specsId = item
              specsApi.specs(specsId).then(result => {
                res.data[0].specs[index] = result.data[0]
                if(index === specsList.length - 1) {
                  list = list.concat(res.data)
                }
                if(list.length === categoryIds.length){
                  this.setData({
                    specsCategories: list
                  })
                }
              })
            })
          })
        })
        this.calculateTotalPrice()
      }
    },
    calculateTotalPrice() {
      let totalPrice = 0
      totalPrice += this.properties.goodsDetail.price
      this.data.specsCategories.forEach(item=>{
        if(item.specs) {
          try {
            !item.specs.length ||  (totalPrice += item.specs[item.specsIndex].price)
          } catch (error) {

          }
        }
      })
      this.setData({
        totalPrice
      })
    },
    onSpecsTap(e) {
      const {specs, specsCategoryIndex} = e.target.dataset
      let specsCategories = this.data.specsCategories
      const index = specsCategories[specsCategoryIndex].specs.findIndex(item => item._id === specs._id)
      specsCategories[specsCategoryIndex].specsIndex = index
      this.setData({
        specsCategories
      })
      this.calculateTotalPrice()
    },
    add() {
      list = this.properties.goodsCart
      list.splice(-1,1)
      let goods = this.properties.goodsDetail
      let specs = []
      let text = ''
      const specsCategories = this.data.specsCategories
      specsCategories.forEach(item => {
        text += item.specs[item.specsIndex].label + " "
      });
      specs.push(text)
      goods['specs'] = specs
      goods['price'] = this.data.totalPrice
      if(!list.length){
        list = list.concat(goods)
      }
      else{
        for(let i=0;i<list.length;i++) {
          if(goods.name === list[i].name && goods.specs[0] === list[i].specs[0]) {
            const Temlist = list[i]
            Temlist.number += 1
            list.splice(i,1)
            list = list.concat(Temlist)
            break
          }
          else{
            if(i === list.length - 1){
              list = list.concat(goods)
              break
            }
          }
        }
      }
      this.triggerEvent('goodsCart', list)
      const goodsDialogShow = false
      this.triggerEvent('goodsDialogShow', goodsDialogShow)
    }
  }
})
