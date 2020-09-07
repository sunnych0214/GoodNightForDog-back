const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const dbConnector = require("./dbConnector");
dbConnector
  .authenticate()
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const User = require("./models/User");
const Cp = require("./models/Cp");
const Report = require("./models/Report");
const AdoptDogInfo = require("./models/AdoptDogInfo");
const AdoptDogApply = require("./models/AdoptDogApply");
const AdoptReview = require("./models/AdoptReview");
const AdoptDogApplyPet = require("./models/AdoptDogApplyPet");
const AdoptReviewComment = require("./models/AdoptReviewComment");
const Dog = require("./models/Dog");
const DogInfo = require("./models/DogInfo");
const Donation = require("./models/Donation");
const DonationInfo = require("./models/DonationInfo");
const Missing = require("./models/Missing");
const Chat = require("./models/Chat");
const Message = require("./models/Message");
const Volunteer = require("./models/Volunteer");

User.sync({ force: false });
Dog.sync({ force: false });
AdoptDogInfo.sync({ force: false });
Cp.sync({ force: false });
Chat.sync({ force: false });
DogInfo.sync({ force: false });
Missing.sync({ force: false });
Message.sync({ force: false });
Volunteer.sync({ force: false });
Donation.sync({ force: false });
DonationInfo.sync({ force: false });
Report.sync({ force: false });
AdoptDogApply.sync({ force: false });
AdoptReview.sync({ force: false });
AdoptDogApplyPet.sync({ force: false });
AdoptReviewComment.sync({ force: false });

User.hasOne(Cp, { foreignKey: "user_id" });
Cp.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Report, { foreignKey: "user_id" });
Report.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(AdoptDogApply, { foreignKey: "user_id" });
AdoptDogApply.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(AdoptReview, { foreignKey: "user_id" });
AdoptReview.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(AdoptReviewComment, { foreignKey: "user_id" });
AdoptReviewComment.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(DonationInfo, { foreignKey: "user_id" });
DonationInfo.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Donation, { foreignKey: "user_id" });
Donation.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Missing, { foreignKey: "user_id" });
Missing.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Volunteer, { foreignKey: "user_id" });
Volunteer.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Message, { foreignKey: "user_id" });
Message.belongsTo(User, { foreignKey: "user_id" });

Dog.hasMany(AdoptDogInfo, { foreignKey: "dog_id" });
AdoptDogInfo.belongsTo(Dog, { foreignKey: "dog_id" });

Dog.hasOne(DogInfo, { foreignKey: "dog_id" });
DogInfo.belongsTo(Dog, { foreignKey: "dog_id" });

Donation.hasMany(DonationInfo, { foreignKey: "donation_id" });
DonationInfo.belongsTo(Donation, { foreignKey: "donation_id" });

Chat.hasMany(Message, { foreignKey: "missing_chat_id" });
Message.belongsTo(Chat, { foreignKey: "missing_chat_id" });

AdoptDogInfo.hasMany(AdoptDogApply, { foreignKey: "adopt_dog_info_id" });
AdoptDogApply.belongsTo(AdoptDogInfo, { foreignKey: "adopt_dog_info_id" });

AdoptDogApply.hasOne(AdoptReview, { foreignKey: "adopt_apply_id" });
AdoptReview.belongsTo(AdoptDogApply, { foreignKey: "adopt_apply_id" });

AdoptDogApply.hasMany(AdoptDogApplyPet, { foreignKey: "adopt_apply_id" });
AdoptDogApplyPet.belongsTo(AdoptDogApply, { foreignKey: "adopt_apply_id" });

AdoptReview.hasMany(AdoptReviewComment, { foreignKey: "adopt_review_id" });
AdoptReviewComment.belongsTo(AdoptReview, { foreignKey: "adopt_review_id" });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);

/**
 * Swagger definition
 */
const swaggerDefinition = {
  info: {
    title: 'Good Nigh For Dog Api Docs',
    version: '1.0.0',
    description: '하룻밤 프로젝트 Api 문서'
  },
  host: 'localhost:3000',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: ['./swagger.yaml']
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
