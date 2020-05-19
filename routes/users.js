const express = require('express');
const router = express.Router();
const userService = require('./../services/UserService');
const utill = require('./../utill');
const jwt = require("jsonwebtoken");
const bkfd2Password = require("pbkdf2-password");
const jwtSecret = require("./../config.json").jwtSecret;

router.post('/login', utill.isLogin, (req, res, next) => {
  const { user_id, passwd } = req.body;

  if(user_id) {
    userService.findByUserId(user_id).then(result => {
      if(!result) res.json(utill.successFalse("존재하지 않는 아이디 입니다.", null));
      else {
        const hasher = bkfd2Password();

        hasher({password: passwd}, (err, pass, salt, hash) => {
          if(err) res.json(utill.successFalse("hasher error", err));
          else if(hash === result.password) {
            const token = jwt.sign({ user_id: user_id }, jwtSecret, {
              expiresIn: "1d",
            });
            res.cookie("user", token);

            const user = {
              user_id: user_id
            }

            res.json(utill.successTrue(user));
          } else {
            res.json(utill.successFalse("비밀번호 불일치", null));
          }
        });
      }
    });
  } else {
    res.json(utill.successFalse("입력한 값을 확인해주세요.", null));
  }
});

module.exports = router;
