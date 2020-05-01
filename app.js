const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const dbConnector = require('./dbConnector');
dbConnector.authenticate()
    .then(() => {
        console.log('Connection Success');
    })
    .catch(err => {
        console.log(err);
    })

const app = express();

const User = require('./models/User');
const Cp = require('./models/Cp');
const Report = require('./models/Report');
const AdoptDogInfo = require('./models/AdoptDogInfo');
const AdoptDogApply = require('./models/AdoptDogApply');
const AdoptReview = require('./models/AdoptReview');
const AdoptDogApplyPet = require('./models/AdoptDogApplyPet');
const AdoptReviewComment = require('./models/AdoptReviewComment');



User.sync({force: false});
Cp.sync({force: false});
Report.sync({force: false});
AdoptDogInfo.sync({force: false});
AdoptDogApply.sync({force: false});
AdoptReview.sync({force: false});
AdoptDogApplyPet.sync({force: false});
AdoptReviewComment.sync({force: false});

User.hasOne(Cp, {foreignKey: "user_id"});

Cp.belongsTo(User, {foreignKey: "user_id"}); 



// 다 수정해야 함 해선 테이블
// Report.belongsTo(User, {foreignKey: "user_id"});
// AdoptDogInfo.belongsTo(AdoptDogApply, {foreignKey: "adopt_apply_id"});
// AdoptDogInfo.belongsTo(Dog, {foreignKey: "dog_id"});
// AdoptDogApply.belongsTo(User, {foreignKey: "user_id"});
// AdoptReview.belongsTo(User, {foreignKey: "user_id"});
// AdoptReview.belongsTo(AdoptDogApply, {foreignKey: "adopt_apply_id"});
// AdoptDogApplyPet.belongsTo(AdoptDogApply, {foreignKey: "adopt_apply_id"});
// AdoptReviewComment.belongsTo(AdoptReview, {foreignKey: "adopt_review_id"});
// AdoptReviewComment.belongsTo(User, {foreignKey: "user_id"});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
