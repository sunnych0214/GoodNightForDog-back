const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt } = metaFields;

const Report = connector.define("Report", {
  report_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  category_code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  report_board_num: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  state,
  create_dt
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = Report;