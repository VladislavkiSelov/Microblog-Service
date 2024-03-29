const router = require('express').Router();
const { checkUser } = require('../secondaryFunction/checkUser');
const { getAllPostsUser } = require('../service/posts');

router.get('/:id', checkUser, getAllPostsUser, async (req, res) => {
  const { posts, user } = req;
  res.render('my_posts', { posts, user });
});

module.exports = {
  router,
};
