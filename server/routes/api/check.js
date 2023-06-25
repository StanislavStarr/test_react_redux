const apiRouter = require('express').Router();

const { User } = require('../../db/models');

apiRouter.get('/', async (req, res) => {
  try {
    const userSession = req.session.userId;
    if (userSession) {
      const user = await User.findOne({
        where: { id: userSession },
      });
      res.status(200).json({ id: user.id, login: user.login });
    } else {
      res.status(300).json({ success: false });
    }
  } catch (error) {
    res.status(404).json({ message: 'какая-то ху..ня' });
  }
});

module.exports = apiRouter;
