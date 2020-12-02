const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 12;
const User = require('../models').User;
const moment = require('moment');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res
            .status(403)
            .send('로그인 필요')
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.json({msg: '로그인 중'})
    }
}
// 비밀번호 암호화 (bcrypt)
exports.passwordToHashing = (password, cb) => {

    bcrypt.genSalt(saltRounds, (err, salt) => { // saltRouunds = 몇 글자의 암호를 만들지
        if (err) 
            return cb(err);
        bcrypt.hash(password, salt, (err, hash) => { // 해시(암호화 한 비밀번호) 생성
            if (err) return cb(err);
            cb(null, hash);
            }
        )
    });
   
}

// 암호화된 비밀번호 확인
exports.comparePassword = (user_email, plainPassword, cb)=>{
    User.findOne({
        where:{
            email:user_email
        }
    }).then(user=>{
        console.log('user')
        // 비밀번호 확인
        bcrypt.compare(plainPassword, user.password, (err, isMatch)=>{ // (원래 비밀번호, 사용자가 입력한 비밀번호, (err, result)) 결과 = true or false
            if(err) return cb(err)
            cb(null, isMatch)
        })
    });
}

// 토큰 생성
exports.generateToken = (user, cb)=>{
    const token = jwt.sign(user.id, 'secretToken'); // secretToken 이름으로 확인할 수 있는 토큰 생성
    User.update({ // 유저 정보 업데이트
        token:token
    },{
        where:{id:user.id}
    }).then(result=>{
        if(!result) return cb(false, null)
        cb(true, token)
    })
    
}

// 토큰 찾기 (토큰 정보가 일치하는지 확인)
exports.findByToken = (token, cb)=>{
    console.log('findbytoken function in middlewares')
    // 토큰 정보 확인
    jwt.verify(token, 'secretToken', (err, decoded)=>{ // result = user id
        if(!decoded) return cb(null)
        User.findOne({where:{"id":decoded, "token":token}})
        .then(user => {
            console.log('find user');
            console.log(user)
            cb(user)
        })
    })
}

// /users/auth 로 요청된 정보를 가지고 있음
exports.auth = (req, res, next)=>{
        let token = req.cookies.x_auth; // x_auth 이름으로 된 쿠기 값을 가져옴
        this.findByToken(token, (user)=>{
            if(!user) return res.json({isAuth: false, error:true}); // 해당하는 유저가 없을 경우 로그인 인증x
            console.log(token);
            req.token = token;
            req.user = user;
            next();
        })
}

// 현재 날짜를 년도-월-일 형식으로 생성 ex) 2020-11-25
exports.nowDate = ()=>{
    console.log('nowDate')
    console.log(moment().format("YYYY-MM-DD"))
    return moment().format("YYYY-MM-DD");
    
}