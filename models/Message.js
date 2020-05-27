const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const MissingMessage = connector.define("MissingMessage", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  message_text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  message_type: {
    type: Sequelize.CHAR,
    allowNull: false,
  },
  state,
  create_dt,
  update_dt,
  delete_dt
});

module.exports = MissingMessage;
