require('dotenv').config();
const express = require('express');

const app = express();
const { PORT } = process.env;
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const sessionConfig = require('./config/session');

// подключение роутеров
const mainRouter = require('./routes/api/mainPage');
const registerRouter = require('./routes/api/register');
const loginRouter = require('./routes/api/login');
const newPost = require('./routes/api/newPost');
const editPost = require('./routes/api/editPost');
const deletePost = require('./routes/api/deletePost');
const checkRouter = require('./routes/api/check');
const initComments = require('./routes/api/initComments');
const newComment = require('./routes/api/newComment');

const logoutRouter = require('./routes/api/logout');

// подключение мидлварок / плагинов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(session(sessionConfig));

// Подключаем импортированные роутеры с определенным url префиксом.
app.use('/posts', mainRouter);
app.use('/new-post', newPost);
app.use('/editpost', editPost);
app.use('/deletepost', deletePost);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/checkin', checkRouter);
app.use('/initcomments', initComments);
app.use('/newcomment', newComment);

app.listen(PORT, () => {
  console.log('Работает');
});
