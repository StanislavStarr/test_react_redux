const apiCommentRouter = require('express').Router();

const { Comment, User } = require('../../db/models');

// создание комментария
apiCommentRouter.post('/:id', async (req, res) => {
  try {
    const data = req.body;
    const newComment = (
      await Comment.create({
        content: data.content,
        post_id: req.params.id,
        user_id: req.session.userId,
      })
    ).get({ plain: true });
    newComment.User = await User.findOne({
      where: { id: req.session.userId },
    });
    res.status(200).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiCommentRouter;
