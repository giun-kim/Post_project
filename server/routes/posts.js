var express = require('express');
const { route } = require('.');
const app = require('../app');
const user = require('../models/user');
// const user = require('../models/user');

var router = express.Router();

var Post = require('../models').Post;
var Comment = require('../models').Comment;
var User = require('../models').User;
var {nowDate} = require('./middlewares')

/* GET users listing. */
router.get('/list', function (req, res, next) {
    Post.findAll({
        order:[['date', 'DESC'], ['id', 'DESC']],
        include:[
          {
          model:User,
          attributes:['name']
          }
        ],
        required:true,
    })
    .then(posts => {
      console.log('#!@#: ', posts)
      res.json(posts);
  })
    // Post
    //     .findAll({order:[['date', 'DESC'], ['id', 'DESC']]})
    //     .then(posts => {
    //         res.json(posts);
    //     })
    // Post.findAndCountAll()
    // .then(posts => {
    //           res.json(posts.count);
    // })
});

router.post('/create', (req, res)=> {
    Post.create({
      user_id:req.body.user_id,
      post: req.body.post,
      view_count:0,
      date:nowDate(),
      title:req.body.title,
    })
    .then((result)=>{
      console.log(result);
      res.json({success:true})
    })
    .catch(err=>{
      console.error(err);
    })
})

router.get('/info/:id', (req, res)=>{
  console.log('dfjalkfdjl;a')
  console.log(req.params.id)

  Post.findOne({where:{id:req.params.id}})
  .then(post=>{
    console.log(post);
    Post.update({
      view_count :post.view_count+1
    },
      {where:{id:req.params.id}});
      Comment.findAll({
        where:{post_id:post.id},
        order:[['date', 'DESC'], ['id', 'DESC']],
        include:[
          {
          model:User,
          attributes:['name']
          }
        ],
        required:true,
      })
    .then(comments=>{
      res.json({post:post, comments:comments})
    })
    // res.json({posts:result});
  })
})

router.post('/update/:id', (req, res)=>{
  console.log('update', req.params.id);
  console.log('data', req.body)
  Post.update({
    title:req.body.title,
    post: req.body.post,
    user_id:req.body.user_id,
  },{
    where:{id:req.params.id}
  })
  .then(result=>{
    console.log('result', result)
    res.json({result, success:true});
  })
})

router.delete('/delete/:id', (req, res)=>{
  console.log('delete', req.params.id);
  Post.destroy({
      where:
      {
        id:req.params.id
      }
  })
  .then(result=>{
    res.json({success:true})
  })
})


router.post('/comment/create', (req, res)=>{
  Comment.create({
    user_id:req.body.user_id,
    comment:req.body.comment,
    post_id:req.body.post_id,
    date:nowDate()
  })
  .then(result=>{
    res.json({success:true})
  })
})

router.post('/comment/update/:id', (req, res)=>{
  Comment.update({
    comment: req.body.comment
  },{
    where:{id:req.params.id}
  })
  .then(result=>{
    res.json({success:true})
  })
})

router.delete('/comment/delete/:id', (req, res)=>{
  Comment.destroy({
    where:{id:req.params.id}
  })
  .then(result=>{
    res.json({success:true})
  })
})
router.get('/comment/:id', (req, res)=>{
  // Comment.findAll({
  //   where:{post_id:req.params.id},
  //   order:[['date', 'DESC'], ['id', 'DESC']],
  //   include:[
  //     {
  //       model:User,
  //       attributes:['name']
  //     }
  //   ]
  // })
  Comment.findAll({
    where:{post_id:req.params.id},
    order:[['date', 'DESC'], ['id', 'DESC']],
    include:[
      {
      model:User,
      attributes:['name']
      }
    ],
    required:true,
  })
  .then(comments=>{
    res.json({comments:comments})
  })
})
module.exports = router;
