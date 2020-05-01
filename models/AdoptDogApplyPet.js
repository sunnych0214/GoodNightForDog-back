const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const AdoptDogApplyPet = connector.define("AdoptDogApplyPet", {

  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },

  adopt_apply_pet_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
  adopt_apply_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_pet_kind: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_pet_sex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_pet_neuter: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  freezeTableName: true,
  underscored: true,
  timestamps: false
});

module.exports = AdoptDogApplyPet;