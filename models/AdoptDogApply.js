const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const AdoptDogApply = connector.define("AdoptDogApply", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  adopt_dog_info_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  adopt_kind: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_sex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_army: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_phone_num: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_job: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_quick_time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_family_adult: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_family_kid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  adopt_apply_family_agree: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adopt_apply_reason: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  adopt_apply_info_save_flag: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
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

module.exports = AdoptDogApply;