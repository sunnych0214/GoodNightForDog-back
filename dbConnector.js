const Sequelize = require('sequelize');
const dbconfig = require('./config').db;
const Op = Sequelize.Op;

const schema =  dbconfig.dbschema;

const sequelize = new Sequelize(
    schema,
    dbconfig.username,
    dbconfig.password,
    {
        'host': dbconfig.host,
        'dialect': dbconfig.dialect,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like,
            $ne: Op.ne,
            $between: Op.between,
            $gte: Op.gte
        },
        logging: false
    }

)

module.exports = sequelize;
