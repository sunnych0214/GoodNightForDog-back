const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const DogInfo = connector.define("DogInfo",{
    no: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
    color_cd: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    age: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    weight: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    weight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    notice_comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    neuter_yn: {
        type: Sequelize.CHAR,
        allowNull: true,
      },
    special_mark: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    care_nm: {
         type: Sequelize.STRING,
        allowNull: true,
      },
    care_tel: {
        type: Sequelize.STRING,
       allowNull: true,
     },
    care_addr: {
        type: Sequelize.STRING,
       allowNull: false,
     },
    org_nm: {
        type: Sequelize.STRING,
       allowNull: false,
     },
    change_nm: {
        type: Sequelize.STRING,
       allowNull: true,
     },
    officetel: {
        type: Sequelize.STRING,
       allowNull: true,
     },
    happen_place: {
        type: Sequelize.STRING,
       allowNull: false,
     },
    inoculation_status: {
        type: Sequelize.STRING,
       allowNull: false,
     },
    euthanasia_date: {
        type: Sequelize.DATE,
       allowNull: false,
     },
    dog_id: {
        type: Sequelize.INTEGER.UNSIGNED,
       allowNull: false,
     },
     state,
     create_dt,
     update_dt,
     delete_dt
});

module.exports = DogInfo;