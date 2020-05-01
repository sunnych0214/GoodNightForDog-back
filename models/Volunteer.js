const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const Volunteer = connector.define("Volunteer",{
    no: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
    volunteer_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
    volunteer_people_num: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
    volunteer_started_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    volunteer_expired_date: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    volunteer_comment: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    volunteer_img: {
        type: Sequelize.STRING,
        allowNull: false
      },
    state,
    create_dt,
    update_dt,
    delete_dt
});


module.exports = Volunteer;