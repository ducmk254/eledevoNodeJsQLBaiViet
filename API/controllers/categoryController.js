const Categoy =require('../models/categoryModel')

module.exports.list_all_category = async (req,res)=>{
    res.send('Get full list of category')
}
module.exports.create_new_category = async (req,res)=>{
    res.send('create a new category')
}
module.exports.change_a_category = async (req,res)=>{
    res.send('change a category')
}

module.exports.remove_a_category = async (req,res)=>{
    res.send('remove a category')
}