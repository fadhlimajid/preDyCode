require('module-alias/register');
require('dotenv').config();
const Sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const userServices = require('../domains/services/user.services');
const jwt = require('jsonwebtoken');

const users = new userServices(Sequelize.Op);

router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
    message: 'Signup successful',
    user: req.user
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        const userdata = jwt.verify(token, process.env.JWT_SECRET).user;
        // console.log(jwt.verify(token, process.env.JWT_SECRET));

        return res.json({ message: 'Signin successful', userdata });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

