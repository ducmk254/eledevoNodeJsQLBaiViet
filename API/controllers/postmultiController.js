const mongoClient = require('mongoose')
const PostMulti = require('../models/postModelMulti')
const Category = require('..//models/categoryModel')

module.exports.get_post_multi = async (req,res)=>{
    try {
        let listPostMulti = await PostMulti.find().populate('categorys')
        res.status(200).json(listPostMulti)
    } catch (error) {
        return res.status(500).json(error)
    }
    
}

module.exports.create_new_postmulti = async (req,res)=>{
    if(!req.body.title) return res.send('Please input a title for post')
    else if(!req.body.content) return res.send('Please input content of post')
        else if(req.body.categoryIds.length <= 0 ) return res.send('Please select one or more category')
            else{
                try {
                    let newPostMulti = await new PostMulti({
                        title: req.body.title,
                        content: req.body.content,
                        categorys:req.body.categoryIds
                    })
                    await newPostMulti.save()
                    for(const pM of req.body.categoryIds){
                        await Category.findByIdAndUpdate(
                            {_id:pM},
                            {$push:{posts:newPostMulti._id}}
                        )
                    }
                    return res.status(200).json(newPostMulti)
                } catch (error) {
                    return res.status(500).json(error)
                }
                
            }
}

module.exports.change_postmulti = async (req,res)=>{
    res.send('Delete a post multi')
}

module.exports.delete_a_postmulti = async (req,res)=>{
    res.send('Delete a post multi')
}