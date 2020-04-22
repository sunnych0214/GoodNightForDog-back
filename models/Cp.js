const connector = require("../dbConnector");
const Sequelize = require("sequelize");
const metaFields = require("./MetaFields");

const { state, create_dt, update_dt, delete_dt } = metaFields;

const Cp = connector.define("Cp", {
  no: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  boss_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  boss_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  biz_num: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dog_cnt: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false
  },
  biz_img: {
    type: Sequelize.STRING,
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

module.exports = Cp;