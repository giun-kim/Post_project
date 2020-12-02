var express = require('express');
var router = express.Router();
var User = require('../models').User;
var middlewares = require('./middlewares');

const {auth} = require('./middlewares');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 회원가입
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
                // 비밀번호 암호화
                middlewares.passwordToHashing(req.body.password,(err, hashinPassword)=>{
                    if(err) res.json({registerSuccess: false, error:err})
                    User.create(
                        {email: req.body.email, password: hashinPassword, name: req.body.name}
                    );
                    res.json({registerSuccess: true})
                });
                
               
            }
        })
})
// 로그인
router.post('/login', (req, res) => {
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(user =>{
        console.log(user)
        if(user===null) return res.json({loginSuccess:false, message:'이메일 오류'})

        // 비밀번호 확인
        middlewares.comparePassword(req.body.email, req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false, message:'비밀번호 오류'})
            // 로그인 정보가 일치할 시 토근 생성
            middlewares.generateToken(user, (err, token)=>{
                if(err===false || token===null){
                    res.json({loginSuccess:false, message:'토큰 생성 실패'})
                }else{
                    // 생성된 토큰을 x_auth 이름으로 된 쿠기 생성
                    res.cookie("x_auth", token).json({loginSuccess:true})
                }
            })
        })
    })
})

// 로그인 인증
// 해당 라우터로 들어오면 middlewares.auth 로 이동
router.get('/auth',auth,  (req, res)=>{
    res.json({ // 로그인 된 유저 정보 담기
        id:req.user.id,
        isAdmin:req.user.role === 0 ? false : true,
        isAuth:true,
        email: req.user.email,
        name:req.user.name,
        role:req.user.role,
    })
})

// 로그아웃
router.get('/logout', auth, (req, res)=>{
    User.update({token:""}, {where:{id:req.user.id}}) // 해당 유저 토큰 초기화
    .then(user=>{
        if(!user) return res.json({logoutSuccess:false});
        return res.clearCookie('x_auth').json({logoutSuccess:true}) //  등록된 쿠키 삭제
    })
})

module.exports = router;
