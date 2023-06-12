import {db} from './cloud-init'

const category = categoryId => {
  return db.collection('specs_category').where({
    _id: categoryId
  }).get()
}


export default {
  category
}