const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const DonationInfo = connector.define("DonationInfo", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  donation_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  registration_number: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  first_address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  second_address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  donation_amount: {
    type: Sequelize.INTEGER,
    allowNull: false
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

module.exports = DonationInfo;