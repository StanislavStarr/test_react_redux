const apiRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

// авторизация пользователя
apiRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res
        .status(409)
        .json({ success: false, message: 'нет такого пользователя' });
      return;
    }

    req.session.userId = user.id;
    res.status(200).json({ id: user.id, login: user.login });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiRouter;
