const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields; 

const Chat = connector.define("MissingChat", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  chat_writer_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  chat_guest_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },  
  category_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  state,
  create_dt,
  update_dt,
  delete_dt
});

module.exports = Chat;
