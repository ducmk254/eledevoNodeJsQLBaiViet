const mongoClient = require('mongoose')
let postSchema = mongoClient.Schema({
    title: String,
    content: String,
    category:{type:mongoClient.Schema.Types.ObjectId, ref:'category'}
})
module.exports = mongoClient.model('post',postSchema)