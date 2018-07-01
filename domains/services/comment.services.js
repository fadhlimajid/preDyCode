require('module-alias/register');
const createError = require('http-errors');
const users = require('../models').Users;
const posts = require('../models').Posts;
const comments = require('../models').Comments;
const express = require('express');
const { response } = require('@helpers');

class Comment {
  constructor(Op) {
    this.Op = Op
  }

  async findAll(queries, res) {
    let opt = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: users, attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }, as: 'user' },
        {
          model: posts, include: [
            { model: users, attributes: ['first_name', 'last_name'], as: 'user' }
          ],
          attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }, as: 'post'
        }
      ]
    }
    try {
      if (Object.keys(queries).length) {
        opt.where = {
          [this.Op.or]: {
            id: queries.id,
            body: { [this.Op.like]: `%${queries.body}%` },
            user_id: { [this.Op.eq]: queries.user_id },
            post_id: { [this.Op.eq]: queries.post_id },
          }
        }
      }
      const findComments = await comments.findAll(opt);

      if (!findComments.length) {
        throw createError(404, "Comment not found");
      }

      return res
        .status(200)
        .json(
          response(true, 'Comment data has been successfully retrieved', findComments)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }

  async newComment(params, res){

  }
}

module.exports = Comment;