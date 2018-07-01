# PreDyCode
This is created for my assignment from **DyCode** for my working application there.
It is a backend-focused blog/forum prototype with **Express JS** framework, **Passport JS** for authentication, and **PostgreSQL** with **Sequelize** ORM.

## Instructions
To install this example on your computer, clone the repository and install dependencies.
```
$ git clone git@github.com:fadhlimajid/preDyCode.git
$ cd preDyCode
$ npm install
```

## Database schema
This repository contains 3 main tables, which are **users**, **posts**, and **comments**, with each user can has many posts and comments, and post can has many comments.
Not included generic entry like id and time stamps, the `users` table contains `email`, `password`, `first_name`, `last_name`, `address`, and `phone`, with email and password may not be empty and email must be unique.
The `posts` table has `user_id`, which connecting this table with users table, and `content` for obvious purpose.
For `comments` table, I added `user_id` and `post_id` to associate it with corresponding tables, and `body` for actual comments.


> You could experience this repository's client-side by accessing `https://predycode.herokuapp.com`
