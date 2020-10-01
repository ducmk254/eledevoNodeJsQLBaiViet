const mongoClient = require('mongoose')
let categorySchema = mongoClient.Schema({
    name: String,
    posts:[{type:mongoClient.Schema.Types.ObjectId, ref:'post'}]
})
module.exports = mongoClient.model('category',categorySchema)