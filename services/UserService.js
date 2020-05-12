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
  create: (data) => {
    return User.create({
      ...data
    });
  }
};