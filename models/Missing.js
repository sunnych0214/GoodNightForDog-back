const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const Missing = connector.define("Missing",{
    no: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
    category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_dog_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    missing_dog_color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    missing_dog_age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_dog_weight: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    missing_dog_kind: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    missing_dog_sex: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
    missing_dog_comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    missing_dog_special: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    missing_dog_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    missing_dog_place: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    missing_dog_reward: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    missing_dog_image: {
        type: Sequelize.STRING,
        allowNull: false
      },
    missing_dog_content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      missing_dog_status: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      state,
      create_dt,
      update_dt,
      delete_dt
});

module.exports = Missing;