const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const AdoptDogInfo = connector.define("AdoptDogInfo", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  
  dog_reg_flag: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
  dog_info_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dog_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: true,
  }
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = AdoptDogInfo;