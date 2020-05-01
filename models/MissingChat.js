const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const MissingChat = connector.define("MissingChat",{
    missing_chat_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_chat_writer_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_chat_guest_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      }
});