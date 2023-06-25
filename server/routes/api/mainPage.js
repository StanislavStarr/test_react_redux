const mainRouter = require('express').Router();

const { Post } = require('../../db/models');

//  зарпрос страницы с моими записями
mainRouter.get('/', async (req, res) => {
  try {
    const allPosts = await Post.findAll();
    res.json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = mainRouter;
