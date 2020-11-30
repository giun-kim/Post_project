var express = require('express');
var router = express.Router();
var User = require('../models').User;
var middlewares = require('./middlewares');

const {auth} = require('./middlewares');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', (req, res) => {
    console.log('register router', req.body)
    User
        .findOne({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            console.log('user: ', result);
            if (result) {
                res.json({registerSuccess: false, message:'이메일 중복'})

            } else {
                middlewares.passwordToHashing(req.body.password,(err, hashinPassword)=>{
                    console.log('success to hashing')
                    if(err) console.log('err', err)
                    User.create(
                        {email: req.body.email, password: hashinPassword, name: req.body.name}
                    );
                    console.log('회원가입 성공');
                    res.json({registerSuccess: true})
                });
                
               
            }
        })
})
router.post('/login', (req, res) => {
    console.log('login', req.body);
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user =>{
        console.log(user)
        if(user===null) return res.json({loginSuccess:false, message:'이메일 오류'})

        middlewares.comparePassword(req.body.email, req.body.password, (err, isMatch)=>{
            console.log(isMatch)
            if(!isMatch) return res.json({loginSuccess:false, message:'비밀번호 오류'})
            middlewares.generateToken(user, (err, token)=>{
                if(err===false || token===null){
                    console.log('토큰 생성 실패')
                    res.json({loginSuccess:false, message:'토큰 생성 실패'})
                }else{
                    console.log('토큰 생성 성공', token)
                    res.cookie("x_auth", token).json({loginSuccess:true})
                }
            })
        })
    })
})

router.get('/auth',auth,  (req, res)=>{
    console.log('auth router')
    res.json({
        id:req.user.id,
        isAdmin:req.user.role === 0 ? false : true,
        isAuth:true,
        email: req.user.email,
        name:req.user.name,
        role:req.user.role,
    })
})

router.get('/logout', auth, (req, res)=>{
    console.log('logout router')
    console.log(req.token)
    User.update({token:""}, {where:{id:req.user.id}})
    .then(user=>{
        if(!user) return res.json({logoutSuccess:false});
        console.log('로그아웃 성공')
        return res.json({logoutSuccess:true})
    })
})

module.exports = router;
