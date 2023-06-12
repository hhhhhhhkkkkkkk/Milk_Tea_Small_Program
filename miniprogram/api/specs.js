import {db} from './cloud-init'

const specs = specsId => {
  return db.collection('specs').where({
    _id: specsId
  }).get()
}
export default {
  specs
}