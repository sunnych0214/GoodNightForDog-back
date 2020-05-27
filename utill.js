module.exports = {
  isLogin: (req, res, next) => {
    console.log(req.body);

    next();
  },
  successTrue: data => {
    return {
      success: true,
      data: data
    };
  },
  successFalse: (message, error) => {
    return {
      success: false,
      message: message,
      error: error
    };
  }
}