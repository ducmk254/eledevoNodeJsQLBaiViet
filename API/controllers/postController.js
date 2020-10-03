const Post =require('../models/postModel')
const Category = require('../models/categoryModel')
module.exports.list_all_post = async (req,res)=>{
    try {
        let posts = await Post.find()
              .populate('category')
        res.send(posts)
    } catch (error) {
        return res.send('Loi: ' + error)
    }
    
    
}
module.exports.create_new_post = async (req,res)=>{
    //Input {req.body} = {title,content,categoryId}
    //Step: create newPost -> save Post -> update for Category
    if(!req.body.title) return res.send('Please input a title')
    else if(!req.body.content) return res.send('Please input content of Post')
         else if(!req.body.categoryId) return res.send('Please select a category')
              else{
                try {
                    const newPost = await new Post({
                        title: req.body.title,
                        content: req.body.content,
                        category:req.body.categoryId
                    })
                    await newPost.save()
                    await Category.findByIdAndUpdate({_id:newPost.category},{$push:{posts:newPost._id}})
                    return res.send('Them thanh cong Post')
                } catch (error) {
                    return res.send('Loi: ',error)
                }
              }
}
module.exports.change_a_post = async (req,res)=>{
    // Inpnut: req.body.postId
    //       re.body. new data for post
    // process:
    //    Step1: find post by Id
    //    if categoryCurrent = categoryNew Step2: update for post
    //    else Step2.1 : update categoryNew 
    //         Step2.2 : remove postID from categoryOld
    //         Step2.3 : update post
    try {
        let postOld = await Post.findById({_id:req.body.postId})
        if(postOld.category === req.body.categoryId){
            await postOld.update({title:req.body.title,content:req.body.content})
            res.send('Sua thanh cong Post')
        }else{
            await Category.findByIdAndUpdate({_id:req.body.categoryId},{$push:{posts:postOld._id}})
            await Category.findByIdAndUpdate({_id:req.body.categoryId},{$pull:{posts:postOld._id}})
            await postOld.update({title:req.body.title,content:req.body.content,category:req.body.categoryId})
            res.send('Sua thanh cong Post !!!')
        }
    } catch (error) {
        return res.send(error)
    }

}

module.exports.remove_a_post = async (req,res)=>{
    // Input postId
    // Post.deleteOne({_id:req.body.postId},(err,result)=>{
    //     if(err) return res.send(err)
    //     res.send(result)
    // })
    // Step1: remove postId from Category 
    // Step2: remove post by req.body.postId
    try {
        let postDelete = await Post.findById({_id:req.body.postId})
        await Category.findOneAndUpdate({_id:postDelete.category},{$pull:{posts:postDelete._id}})
        await postDelete.remove()
        res.send('Xoa thanh cong Post ')
    } catch (error) {
        return res.send('Loi: ' + error)
    }
}