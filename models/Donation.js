const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const Donation = connector.define("Donation", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  related_content: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  target_money: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  total_money: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  total_donationer: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  biz_term_start: {
    type: Sequelize.DATE,
    allowNull: true
  },
  biz_term_end: {
    type: Sequelize.DATE,
    allowNull: true
  },
  biz_target: {
    type: Sequelize.STRING,
    allowNull: true
  },
  target_count: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  biz_effect: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  usage_plan: {
    type: Sequelize.TEXT,
    allowNull: true
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

module.exports = Donation;