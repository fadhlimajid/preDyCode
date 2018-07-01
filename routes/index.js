const usersRouter = require('./users');
const postsRouter = require('./posts');
const commentsRouter = require('./comments');
const authRouter = require('./auth');
const indexRouter = require('./home');

const loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

// indexRouter.get('/home',  function (req, res) {
//   res.send(req.session)
// })

// indexRouter.get('/logout', function (req, res) {
//   req.logout()

// })

module.exports = { indexRouter, usersRouter, postsRouter, commentsRouter, authRouter };
