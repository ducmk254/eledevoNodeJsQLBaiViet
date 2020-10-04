const mongoClient = require('mongoose')

let postModelMultSchema = mongoClient.Schema({
    title: String,
    content:String,
    categorys: [{
        type: mongoClient.Schema.Types.ObjectId,
        ref:'category'
    }]
})

module.exports = mongoClient.model('postmulti',postModelMultSchema)