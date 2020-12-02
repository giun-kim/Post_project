var express = require('express');

var router = express.Router();

var Post = require('../models').Post;
var Comment = require('../models').Comment;
var User = require('../models').User;
var {nowDate} = require('./middlewares')

/* GET users listing. */
router.get('/list', function (req, res, next) { // 게시글 리스트
    Post.findAll({
        order:[['date', 'DESC'], ['id', 'DESC']],
        include:[ // INNER JOIN
          {
          model:User, 
          attributes:['name'],
          required:true // 없거나 false(기본값)일 경우 Post 기준 LEFT JOIN과 같은 결과
          }
        ]
    })
    .then(posts => {
      console.log('#!@#: ', posts)
      res.json(posts);
  })
});

router.post('/create', (req, res)=> { // 게시글 생성
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

router.get('/info/:id', (req, res)=>{ // 게시글 보기 클릭
  console.log('dfjalkfdjl;a')
  console.log(req.params.id)

  Post.findOne({where:{id:req.params.id}}) // 해당 게시글 select
  .then(post=>{
    console.log(post);
    Post.update({
      view_count :post.view_count+1
    },
      {where:{id:req.params.id}});
      Comment.findAll({ // 
        where:{post_id:post.id},
        order:[['date', 'DESC'], ['id', 'DESC']],
        include:[
          {
          model:User,
          attributes:['name'],
          required:true
          }
        ]
      })
    .then(comments=>{
      res.json({post:post, comments:comments})
    })
  })
})

router.post('/update/:id', (req, res)=>{ // 게시글 수정
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

router.delete('/delete/:id', (req, res)=>{ // 게시글 삭제
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


router.post('/comment/create', (req, res)=>{ // 댓글 생성
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

router.post('/comment/update/:id', (req, res)=>{ // 댓글 수정
  Comment.update({
    comment: req.body.comment
  },{
    where:{id:req.params.id}
  })
  .then(result=>{
    res.json({success:true})
  })
})

router.delete('/comment/delete/:id', (req, res)=>{ // 댓글 삭제
  Comment.destroy({
    where:{id:req.params.id}
  })
  .then(result=>{
    res.json({success:true})
  })
})
router.get('/comment/:id', (req, res)=>{ // 댓글 가져오기 (생성, 수정, 삭제 시)
  Comment.findAll({
    where:{post_id:req.params.id},
    order:[['date', 'DESC'], ['id', 'DESC']],
    include:[
      {
      model:User,
      attributes:['name'],
      required:true
      }
    ]
  })
  .then(comments=>{
    res.json({comments:comments})
  })
})
module.exports = router;
