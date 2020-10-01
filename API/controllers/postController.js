const Post =require('../models/postModel')

module.exports.list_all_post = async (req,res)=>{
    res.send('Get full list of post')
}
module.exports.create_new_post = async (req,res)=>{
    res.send('create a new post')
}
module.exports.change_a_post = async (req,res)=>{
    res.send('change a post')
}

module.exports.remove_a_post = async (req,res)=>{
    res.send('remove a post')
}