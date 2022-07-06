module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "A user with that username already exist. Username must be unique",
      },
      validate: {
        notEmpty: { msg: "The username can't be empty " },
        notNull: { msg: "The username is required" },
        len: [1, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "The password can't be empty " },
        notNull: { msg: "The password is required" },
        len: [1, 255],
      },
    },
  });
};
