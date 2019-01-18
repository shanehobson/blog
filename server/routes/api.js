const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post.js');
const All = require('../models/All.js');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
const AWS = require('aws-sdk');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const app = express();
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Headers */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Mongo DB Atlas Connection string */
const uri = "mongodb+srv://shane:Helium5544%21@cluster0-gjsun.mongodb.net/test?retryWrites=true";

/* Mongoose Connection */
mongoose.Promise = require('bluebird');
mongoose.connect(uri, { useNewUrlParser: true, useMongoClient: true, promiseLibrary: require('bluebird') }) // Local DB: mongodb:localhost:27017/blogPosts
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
const connection = mongoose.connection;

/* AWS Config */
AWS.config.update({
  accessKeyId: process.env.AWS_Access_Key_Id,
  secretAccessKey: process.env.AWSSecretKey
});
AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

/***** ENDPOINTS *****/ 

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* Image and video upload and save to AWS S3 Bucket */
router.post('/images', (request, response) => {
  console.log('entered image post handler');
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) {
        console.log('error parsing form data');
        throw new Error(error);
      }
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        console.log('success');
        return response.status(200).send(fileName + '.' + type.ext);
      } catch (error) {
        console.log('error' + error);
        return response.status(400).send(error);
      }
    });
  });

/* Get Posts from DB and send to front end */
router.get('/posts', function(req, res, next) {
  Post.find({}, function (err, products) {
    if (err) return next(err);
    console.log('success get posts from db');
    res.status(200).json(products);
  });
});

/* Add New Blog Post to DB */
router.post('/addPost', (req, res) => {
  console.log('entered POST new blog post endpoint');
  console.log(req.body);
  if (req.body['_id']) {
    console.log('Editing post')
    console.log(req.body['_id']);
    Post.findByIdAndUpdate(req.body['_id'], req.body, (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        console.log(result);
      }
    });
  } else {
    console.log('creating new post');
    Post.create(req.body);
  }
  console.log('Success adding post to DB');
  res.status(200).send();
});

// router.post('/addPost', (req, res) => {
//   console.log('entered POST new blog post endpoint');
//   console.log(req.body);
//   if (req.body['_id']) {
//     connection.collection('posts').findOneAndReplace({_id: req.body['_id']}, req.body);
//   } else {
//     connection.collection('posts').insertOne(req.body);
//   }
//   console.log('Success adding post to DB');
//   res.status(200).send();
// });

/* Remove blog post from DB */
router.get('/removePost', (req, res) => {
  const id = req.query.id;
  console.log(id);
  Post.findByIdAndRemove(id, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send();
  });
});

/* Remove all blog posts from DB */
router.get('/removeAllPosts', (req, res) => {
  connection.collection('posts').remove((err, data) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send();
  });
});

/* Get single blog post from DB */
router.get('/getPost', (req, res) => {
  console.log('getPost called on api');
  const id = req.query.id;
  console.log(id);
  Post.findOne({ _id: id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.status(200).send(data);
  });
});

module.exports = router;