const express = require('express');
const router = express.Router();
const userService = require('./../services/UserService');

router.post('/login', (req, res, next) => {
  const { user_id } = req.body;

  if(user_id) {
    userService.findByUserId(user_id).then(result => {
      res.json(result);
    });

  // 지쇼니
  //   userService.create(data).then( result => {
  //     console.log(result);
  //     result.no
  //   })
  }
});

module.exports = router;
