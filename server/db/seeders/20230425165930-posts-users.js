const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await User.bulkCreate(
      [
        {
          login: 'fedor',
          password: await bcrypt.hash('111', 10),
          Posts: [
            {
              image:
                'https://i.pinimg.com/originals/71/14/e7/7114e7f6d60eab325e94f45357515a89.jpg',
              title: 'Знакомьтесь',
              content: 'Это Хання',
              user_id: 1,
            },
            {
              image:
                'https://hotmot.ru/upload/iblock/a65/a65d77a9915303cacd3f1ceddbad9090.jpg',
              title: 'Дрын-дрын',
              content: 'Это не Хання',
              user_id: 1,
            },
          ],
        },
        {
          login: 'sasha',
          password: await bcrypt.hash('222', 10),
          Posts: [
            {
              image:
                'https://news.store.rambler.ru/img/d5dcf539bde1fbcda616a1f5097a0c88?img-format=auto&img-1-resize=height:355,fit:max&img-2-filter=sharpen',
              title: 'Мастер на все руки',
              content: 'когда один...',
              user_id: 2,
            },
            {
              image:
                'https://static.tildacdn.com/tild3139-3462-4361-a633-366531396266/40737d5b88048d5a8d27.jpg',
              title: 'Это традик',
              content: 'Ну стиль такой',
              user_id: 2,
            },
          ],
        },
      ],
      {
        include: [Post],
      }
    );
  },

  async down() {
    await User.destroy({ truncate: { cascade: true } });
  },
};
