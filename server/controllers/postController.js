import { validationResult } from 'express-validator';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const postController = {
  createPost: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const newPost = await Post.create({
        ...req.body,
        userID: req.user._id,
      });
      if (!newPost)
        return res.status(400).json({
          message: 'При создании поста произошла непредвиденная ошибка',
        });

      return res.json({
        message: 'Пост создан успешно',
        newPost,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOnePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { views: 1 },
        }
      );
      if (!post)
        return res.status(404).json({
          message: 'Пост не найден',
        });

      const anotherPosts = await Post.find({ category: post.category }).limit(
        2
      );

      return res.json({
        message: 'Пост найден',
        post,
        anotherPosts,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();

      !posts
        ? res.status(404).json({ message: 'Посты не найден' })
        : res.json({ message: 'Запрос выполнен успешно', posts });
    } catch (error) {
      console.log(error);
    }
  },
  getPostsById: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const posts = await Post.find({ userID: user._id });
    if (!posts) {
      return res.status(404).json({
        message: 'У вас еще нет постов',
      });
    }
    return res.status(200).json({
      message: 'Посты найдены',
      posts,
    });
  },
  updatePost: async (req, res) => {
    try {
      await Post.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          picture: req.body.picture,
        }
      );
      const posts = await Post.find();

      return res.json({
        message: 'Пост удален успешно',
        posts,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);

      const posts = await Post.find();

      return res.json({
        message: 'Пост удален успешно',
        post,
        posts,
      });
    } catch (error) {
      console.log(error);
    }
  },
  likePost: async (req, res) => {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).json({
        message: 'Авторизуйтесь',
      });

    if (!post.likes.includes(user._id)) {
      await Post.findByIdAndUpdate(post._id, {
        $push: {
          likes: user._id,
        },
      });
      return res.json({
        message: 'Like',
        post
      });
    } else {
      await Post.findByIdAndUpdate(post._id, {
        $pull: {
          likes: user._id,
        },
      });
      return res.json({
        message: 'Dislike',
        post
      });
    }
  },
  getLikedState: async (req, res) => {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(401).json({
        message: 'Авторизуйтесь',
      });

    if (post.likes.includes(user._id)) {
      return res.json({
        liked: true,
      });
    } else {
      return res.json({
        liked: false,
      });
    }
  },
};
