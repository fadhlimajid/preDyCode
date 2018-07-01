require('module-alias/register');
const router = require('express').Router();
const postServices = require('../domains/services/post.services');
const Sequelize = require('sequelize');
const userServices = require('../domains/services/user.services');

const posts = new postServices(Sequelize.Op);

router.get('/', async function (req, res) {
  return posts.findAll(req.query, res);
})

router.post('/', async function (req, res) {
  let { content } = req.body;
  let params = { content }

  await posts.createPost(params, res);
})

router.patch('/edit', async function (req, res) {
  return await posts.updatePost(req, res);
})

router.delete('/delete', async function (req, res) {
  return await posts.delete(req, res);
})

module.exports = router;
