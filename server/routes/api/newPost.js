const apiRouter = require('express').Router();
const { Post } = require('../../db/models');

// создание новой записи
apiRouter.post('/', async (req, res) => {
  try {
    const data = req.body.newPost;
    console.log(data);
    const entry = await Post.create({
      image: data.image,
      title: data.title,
      content: data.content,
      user_id: req.session.userId,
    });
    console.log(entry);
    await entry.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiRouter;
