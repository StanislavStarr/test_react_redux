const apiCommentRouter = require('express').Router();

const { Comment, User } = require('../../db/models');

// запрос формы с комментариями
apiCommentRouter.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.findAll({
      where: { post_id: postId },
      order: [['createdAt', 'ASC']],
      include: User,
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiCommentRouter;
