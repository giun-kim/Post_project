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

// exports.verifyToken = (req, res, next) => {
//     try {
//         req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
//         return next();
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             return res
//                 .status(419)
//                 .json({code: 419, msg: '유효하지 않은 토큰'})
//         }

//         return res
//             .status(401)
//             .json({code: 401, msg: '유효하지 않은 토큰'});
//     }
// };

exports.passwordToHashing = (password, cb) => {
    console.log('passwordToHassing')
    console.log(password);
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) 
            return cb(err);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return cb(err);
            cb(null, hash);
            }
        )
    });
   
}

exports.comparePassword = (user_email, plainPassword, cb)=>{
    console.log('comparePassword')
    User.findOne({
        where:{
            email:user_email
        }
    }).then(user=>{
        console.log('user')
        bcrypt.compare(plainPassword, user.password, (err, isMatch)=>{
            if(err) return cb(err)
            cb(null, isMatch)
        })
    });
}

exports.generateToken = (user, cb)=>{
    console.log('generateToken')
    const token = jwt.sign(user.id, 'secretToken');
    User.update({
        token:token
    },{
        where:{id:user.id}
    }).then(result=>{
        if(!result) return cb(false, null)
        cb(true, token)
    })
    
}

exports.findByToken = (token, cb)=>{
    console.log('findbytoken function in middlewares')
    jwt.verify(token, 'secretToken', (err, decoded)=>{
        console.log("decoded - ", decoded)
        if(!decoded) return cb(null)
        User.findOne({where:{"id":decoded, "token":token}})
        .then(user => {
            console.log('find user');
            console.log(user)
            cb(user)
        })
    })
}

exports.auth = (req, res, next)=>{
        console.log('auth in middleware')

        let token = req.cookies.x_auth;
        console.log(token);
        this.findByToken(token, (user)=>{
            console.log('토큰 찾기 by auth function')
            if(!user) return res.json({isAuth: false, error:true});
            console.log(token);
            req.token = token;
            req.user = user;
            next();
        })
}


exports.nowDate = ()=>{
    console.log('nowDate')
    console.log(moment().format("YYYY-MM-DD"))
    return moment().format("YYYY-MM-DD");
    
}