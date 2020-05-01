const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const Dog = connector.define("Dog", {
    no: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
    desertion_no  : {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    notice_no: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    process_state: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
    sex_cd: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
    notice_sdt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    img: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state,
      create_dt,
      update_dt,
      delete_dt
});