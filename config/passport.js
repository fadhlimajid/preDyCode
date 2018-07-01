require('module-alias/register')
const users = require('@models').Users;
const createError = require('http-errors');
const Op = require('sequelize').Op;
const { response } = require('@helpers');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');



passport.use(new JWTstrategy({
  secretOrKey: 'preDyCode_blog',
  jwtFromRequest: ExtractJWT.fromUrlQueryParameter('tokennya_cihuy')
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await users.create({
      email,
      password: bcrypt.hashSync(password, 10)
    });
    return done(null, user);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await users.findOne({ where: { email: email } });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));