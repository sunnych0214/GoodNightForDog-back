const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const MissingMessage = connector.define("MissingMessage",{
    missing_message_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_chat_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_message_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    missing_message_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
    missing_message_type: {
        type: Sequelize.CHAR,
        allowNull: false
      },
});