const apiMyRouter = require('express').Router();

const { Post } = require('../../db/models');

// редактирование записи
apiMyRouter.put('/', async (req, res) => {
  try {
    const { postId, image, title, content } = req.body;
    // проверка IDOR
    const post = await Post.findOne({
      where: {
        id: postId,
        user_id: req.session.userId,
      },
    });
    if (post) {
      post.image = image;
      post.title = title;
      post.content = content;
      await post.save();
      res.json({
        id: post.id,
        image: post.image,
        title: post.title,
        content: post.content,
      });
    } else {
      res.status(400).json({ success: false, message: 'нет прав' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiMyRouter;
