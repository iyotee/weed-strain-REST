const { Sequelize, DataTypes } = require("sequelize");
const strainModel = require("../models/strain");
const userModel = require("../models/user");
const strains = require("./mock-strains");
const users = require("./mock-users");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("straindex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT+2",
  },
  logging: true,
});

const Strain = strainModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    console.log("InitDB: Synced database");
    strains.map((strain) => {
      Strain.create({
        name: strain.name,
        aka: strain.aka,
        thc: strain.thc,
        cbd: strain.cbd,
        picture: strain.picture,
        feelings: strain.feelings,
        negatives: strain.negatives,
        flavors: strain.flavors,
      }).then((strain) => console.log(strain.toJSON()));
    });

    users.map((user) => {
      bcrypt
        .hash(user.password, 10)
        .then((hash) =>
          User.create({ username: user.username, password: hash })
        )
        .then((user) => console.log(user.toJSON()));
      console.log("Database initialized !");
    });
  });
};
module.exports = {
  initDb,
  Strain,
  User,
};
