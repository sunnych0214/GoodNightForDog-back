const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const AdoptReview = connector.define("AdoptReview", {


  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },

  adopt_review_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_content: {
    type: Sequelize.TEXT,
    allowNull: false,
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

module.exports = AdoptReview;