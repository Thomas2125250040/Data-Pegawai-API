const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const moment = require('moment');

function result(succ, msg, details) {
  if (details) {
    return {
      success: succ,
      message: msg,
      data: details,
    };
  } else {
    return {
      success: succ,
      message: msg,
    };
  }
}

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    const formattedPosts = posts.map(post => {
      const formattedDate = moment(post.created_date).format('DD-MM-YYYY');
      return { ...post.toObject(), created_date: formattedDate };
    });

    if (formattedPosts.length > 0) {
      res.status(200).json(result(1, 'Retrieve Data Success!', formattedPosts));
    } else {
      res.status(200).json(result(0, 'Zero Data!'));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(result(0, error.message));
  }
});

router.post('/', async (req, res) => {
  const inputPost = new Post({
    gambar: req.body.gambar,
    nama: req.body.nama,
    umur: req.body.umur,
    jabatan: req.body.jabatan,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan
  })

  try {
    const post = await inputPost.save()
    res.status(200).json(result(1, 'Insert Post Success!'))
  } catch (error){
    res.status(500).json(result(0, error.message))
  }
})

router.put('/', async (req, res) => {
  const data = {
    id: req.body._id,
    gambar: req.body.gambar,
    nama: req.body.nama,
    umur: req.body.umur,
    jabatan: req.body.jabatan,
    alamat: req.body.alamat,
    keterangan: req.body.keterangan,
    modified_date: Date.now()
  }

  try {
    const post = await Post.updateOne({
      _id: data.id
    }, data)

    if (post.matchedCount > 0){
      res.status(200).json(result(1, 'Update Post Success'))
    } else {
      res.status(200).json(result(0, 'Update Post Failed!'))
    }
  } catch (error){
    res.status(500).json(result(0, error.message))
  }
})

router.delete('/:id', async(req,res)=>{
  try{
    const post = await Post.deleteOne({
      "_id": req.params.id
    }).exec();
    if (post.deletedCount > 0){
      res.status(200).json(result(1, 'Delete Post Success!'))
    } else {
      res.status(200).json(result(1, 'Delete Post Failed!'))
    }
  } catch (error) {
    res.status(500).json(result(0, error.message))
  }
})

module.exports = router