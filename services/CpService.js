const Cp = require("./../models/Cp");

module.exports = {
  create: (data) => {
    return Cp.create({
        ...data
    });
  }
}