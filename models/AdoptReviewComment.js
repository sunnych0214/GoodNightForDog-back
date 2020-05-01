const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const AdoptReviewComment = connector.define("AdoptReviewComment", {

  adopt_review_comment_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  adopt_review_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_review_comment: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_review_comment_parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  state,
  create_dt,
  update_dt,
  delete_dt
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = AdoptReviewComment;