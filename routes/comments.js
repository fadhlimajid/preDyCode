require('module-alias/register');
const router = require('express').Router();
const commentServices = require('../domains/services/comment.services');
const Sequelize = require('sequelize');
const userServices = require('../domains/services/user.services');

const comments = new commentServices(Sequelize.Op);

router.get('/', async function (req, res) {
  return comments.findAll(req.query, res);
})

router.post('/', async function (req, res) {
  let { body } = req.body;
  let params = { body }

  await comments.createPost(params, res);
})

router.patch('/edit', async function (req, res) {
  return await comments.edit(req, res);
})

router.delete('/delete', async function (req, res) {
  return await comments.delete(req, res);
})

module.exports = router;
