// запрос выхода из сессии

const apiRouter = require('express').Router();

apiRouter.get('/', (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('user_sid');
      res.status(200).json({});
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = apiRouter;
