import {db} from './cloud-init.js'
const create = ({ goodsOrder }) => {
  return db.collection('order').add({
    data: {
      shop_name: goodsOrder.shop_name,
      state: goodsOrder.state,
      pic: goodsOrder.pic,
      time: goodsOrder.time,
      number: goodsOrder.number,
      price: goodsOrder.price
    }
  })
}
const order = () => {
  return db.collection('order').get()
}
export default {
  create,
  order
}