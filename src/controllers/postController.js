const Post = require('../models/Post');

// Crear un nuevo post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;
    const newPost = new Post({ title, content, image });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Leer todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Leer un post por su ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un post por su ID
exports.updatePostById = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.path : null;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un post por su ID
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
