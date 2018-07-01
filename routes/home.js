require('module-alias/register');
const router = require('express').Router();

router.get('/', function (req, res) {
  res.render('index.ejs', { title: "PreDycode Blog" });
})

router.get('/login', function (req, res) {
  res.render('login.ejs', { title: "Login Page" });
})

router.get('/register', function (req, res) {
  res.render('register.ejs', { title: "Register" });
})

module.exports = router;
