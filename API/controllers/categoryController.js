const Category =require('../models/categoryModel')
const Post = require('../models/postModel')
const PostMulti = require('../models/postModelMulti')
module.exports.list_all_category = async (req,res)=>{
    try {
        let listCategory = await await   Category.find().populate('posts')
        return res.send(listCategory)
    } catch (error) {
        return res.send('Loi: ' + error)
    }
}
module.exports.create_new_category = async (req,res)=>{
    //Input: {req.body} = {name}
    let eRR = []
    if(!req.body.name) {
        eRR.push('Please input a name of Category.')
        return res.send(eRR)
    }else{
        const newCategory = await new Category({name: req.body.name})
        await newCategory.save((e,re)=>{
            if(e)return res.send(e)
            return res.send(re)
        });
    }
}
module.exports.change_a_category = async (req,res)=>{
    //Input {req.body} = {CategoryId,name}
    try {
        await Category.findByIdAndUpdate({_id:req.body.categoryId},{name:req.body.name})
        res.send('Sua thanh cong!!!')
    } catch (error) {
        res.send('Loi ' + error)
    }
}

module.exports.remove_a_category = async (req,res)=>{
    //Input : req.body.categoryId
    //step1: search category
    // step 2: update posts and set null for post
    // step3: remove category
    try {
        let deleteCategory = await Category.findById({_id:req.body.categoryId})
        console.log(deleteCategory.posts)
        for(const postId of deleteCategory.posts){
            console.log(postId)
            await Post.findByIdAndUpdate({_id:postId},{category:null})
        }
        await deleteCategory.deleteOne()
        res.send('Xoa thanh cong category')
    } catch (error) {
        return res.send(error)
    }
}