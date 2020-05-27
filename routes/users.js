const express = require('express');
const router = express.Router();
const userService = require('./../services/UserService');

router.post('/CooperationJoin', (req, res, next) => {


  var datetime = new Date();
  datetime = JSON.stringify(datetime);


  const { user_id,
    passwd,
    passwd_chk,
    email,
    name,
    phone_number,
    address,
    address_detail,
    personal_info_yn,
    use_agreement_yn,
    boss_name,
    boss_num,
    biz_num,
    dog_cnt,
    biz_img
  } = req.body;

  //비밀번호가 다름
  if (passwd != passwd_chk) {
    res.json(utill.successFalse("비밀번호 확인이 맞지 않습니다.", null));
  }

  //비밀번호 암호화
  const hasher = bkfd2Password();
  hasher({ password: passwd }, (err, pass, salt, hash) => {
    passwd = hash;
  });

  const user = {
    user_id: user_id.trim(),
    password: passwd.trim(),
    email: email.trim(),
    name: name.trim(),
    phone_number: phone_number.trim(),
    address: address.trim() + " | " + address_detail.trim(),
    user_type: 'C',
    personal_info_yn: personal_info_yn,
    use_agreement_yn: use_agreement_yn,
    state: 7,
    create_dt: datetime
  }

  const cp = {
    user_id: user_id.trim(),
    boss_name: boss_name.trim(),
    boss_num: boss_num.trim(),
    biz_num: biz_num.trim(),
    dog_cnt: dog_cnt,
    biz_img: biz_img //이미지도 그대로 넣으면 될지?..
  }

  userService.create(user).then(result => {
    userService.create(cp).then(result => {
      // 회원가입 실패
      if (!result) res.json(utill.successTrue("회원가입에 문제가 생겼습니다. 입력한 값을 확인해주세요.", null));

      //성공
      else {
        res.json(utill.successFalse("회원가입에 성공하였습니다.", null));
      }
    });

  });
});

module.exports = router;
