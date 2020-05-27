const User = require('./../models/User');

module.exports = {
  findByUserId: user_id => {
    return User.findOne({
      where: {
        user_id: user_id,
        state: {
          $not: "D"
        }
      }
    })
  },
  // 비밀번호 확인 로직 넣기,
  // 비밀번호 암호화 걸기
  create: (data) => {
    return User.create({
        ...data
    });
  }
};