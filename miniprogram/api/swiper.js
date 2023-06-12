import {db} from './cloud-init'
const list = () => {
  return db.collection('hk_swiper').get();
}

export default {
  list
}