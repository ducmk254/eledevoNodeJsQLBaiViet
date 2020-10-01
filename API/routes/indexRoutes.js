const categoryController = require('../controllers/categoryController')
const postController = require('../controllers/postController')


module.exports = (app)=>{
    app.route('/categorys')
        .get(categoryController.list_all_category)
        .post(categoryController.create_new_category)
        .put(categoryController.change_a_category)
        .delete(categoryController.remove_a_category)
    app.route('/posts')
        .get(postController.list_all_post)
        .post(postController.create_new_post)
        .put(postController.change_a_post)
        .delete(postController.remove_a_post)
}   