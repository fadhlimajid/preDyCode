require('module-alias/register');
const createError = require('http-errors');
const users = require('../models').Users;
const posts = require('../models').Posts;
const comments = require('../models').Comments;
const express = require('express');
const { response } = require('@helpers');

class Post {
  constructor(Op) {
    this.Op = Op
  }

  async findAll(queries, res) {
    let opt = {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: users, attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }, as: 'user' },
        {
          model: comments, include: [
            { model: users, attributes: ['first_name', 'last_name'], as: 'user' }
          ],
          attributes: { exclude: ['post_id', 'createdAt', 'updatedAt'] }, as: 'comments'
        }
      ]
    }
    try {
      if (Object.keys(queries).length) {
        opt.where = {
          [this.Op.or]: {
            id: queries.id,
            content: { [this.Op.like]: `%${queries.content}%` },
            user_id: { [this.Op.eq]: queries.user_id },
          }
        }
      }
      const findPosts = await posts.findAll(opt);

      if (!findPosts.length) {
        throw createError(404, "Post not found");
      }

      return res
        .status(200)
        .json(
          response(true, 'Post data has been successfully retrieved', findPosts)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }

  async createPost(params, res) {
    try {
      let newPost = await users.create({
        content: params.content,
      })
      return res
        .status(200)
        .json(
          response(true, 'New user has been successfully registered.', newPost)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(400).json(response(false, error.errors));
      }
      return res.status(400).json(response(false, error.message));
    }
  }

  async updatePost(params, res) {
    try {
      const edited = posts.update({ content: params.content }, { where: { id: me } })

      return res
        .status(200)
        .json(
          response(true, 'Post has been successfully edited', edited)
        );
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }

  async deletePost(req, res) {
    try {
      posts.destroy({ where: { id: me } })
    } catch (error) {
      if (error.errors) {
        return res.status(error.status).json(response(false, error.errors));
      }
      return res.status(error.status).json(response(false, error.message));
    }
  }
}

module.exports = Post;