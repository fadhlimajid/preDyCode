require('module-alias/register');
require('dotenv').config();
const createError = require('http-errors');
const users = require('../models').Users;
const posts = require('../models').Posts;
const comments = require('../models').Comments;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { response } = require('@helpers');


class User {
  constructor(Op) {
    this.Op = Op
  }

  async findAll(queries, res) {
    let opt = {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: [
        { model: posts, attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] }, as: 'posts' },
        { model: comments, attributes: { exclude: ['user_id', 'createdAt', 'updatedAt'] }, as: 'comments' }
      ]
    }
    try {
      if (Object.keys(queries).length) {
        opt.where = {
          [this.Op.or]: {
            id: queries.id,
            first_name: { [this.Op.like]: `%${queries.first}%` },
            last_name: { [this.Op.like]: `%${queries.last}%` },
            email: { [this.Op.like]: `%${queries.email}%` },
            address: { [this.Op.like]: `%${queries.address}%` },
            phone: queries.phone
          }
        }
      }
      const findUser = await users.findAll(opt);

      if (!findUser.length) {
        throw createError(404, "User not found");
      }

      return res
        .status(200)
        .json(
          response(true, 'User data has been successfully retrieved', findUser)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }

  async edit(req, res) {
    const { first_name, last_name, email, password, address, phone } = req.body;
    const data = { first_name, last_name, email, password, address, phone }
    try {
      const edited = users.update(data, { where: { id: me } })

      return res
        .status(200)
        .json(
          response(true, 'User data has been successfully edited', edited)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }

  async delete(req, res) {
    try {
      users.destroy({ where: { id: me } })
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }
}

module.exports = User;