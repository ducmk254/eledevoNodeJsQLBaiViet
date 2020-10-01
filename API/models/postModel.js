const mongoClient = require('mongoose')
let postSchema = mongoClient.Schema({
    title: String,
    content: String,
    posts:{type:mongoClient.Schema.Types.ObjectId, ref:'categry'}
})
module.exports = mongoClient.model('post',postSchema)