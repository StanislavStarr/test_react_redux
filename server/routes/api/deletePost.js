const apiMyRouter = require('express').Router();

const { Post } = require('../../db/models');

// удаление записи
apiMyRouter.delete('/', async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.destroy({
      where: {
        id: postId,
        user_id: req.session.userId,
      },
    });
    if (post) {
      res.json({ success: true });
    } else {
      res.status(400).json({
        success: false,
        message: 'Не трогай чужое, а то мамке на тебя настучу!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Сервер упал :(',
    });
  }
});

module.exports = apiMyRouter;
