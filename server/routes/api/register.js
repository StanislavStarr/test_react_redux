const apiRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

// регистрация нового пользователя
apiRouter.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { login, password, rePassword } = req.body;
    if (password !== rePassword) {
      res.status(403).json({ success: false, message: 'разные пароли' });
      return;
    }
    const findUser = await User.findOne({ where: { login } });
    if (findUser) {
      res.status(409).json({ success: false, message: 'уже есть такой' });
      return;
    }
    const user = await User.create({
      login,
      password: await bcrypt.hash(password, 10),
    });
    console.log(user);
    req.session.userId = user.id;
    res.status(200).json({ id: user.id, login: user.login });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'сервер упал' });
  }
});

module.exports = apiRouter;
