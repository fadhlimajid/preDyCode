require('module-alias/register');
const Sequelize = require('sequelize');
const router = require('express').Router();
const userServices = require('../domains/services/user.services');

const users = new userServices(Sequelize.Op);

router.get('/', async function (req, res) {
  return await users.findAll(req.query, res);
})

router.patch('/edit', async function (req, res) {
  return await users.edit(req, res);
})

router.delete('/delete', async function (req, res) {
  return await users.delete(req, res);
})

module.exports = router;
