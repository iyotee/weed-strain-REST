const validFeelings = [
  "happy",
  "sad",
  "angry",
  "neutral",
  "relaxed",
  "tired",
  "upset",
  "hungry",
  "aroused",
  "talkative",
  "sleepy",
  "euphoric",
  "giggly",
  "creative",
  "uplifted",
  "energetic",
];
const validNegatives = [
  "dizzy",
  "anxious",
  "paranoid",
  "dry mouth",
  "dry eyes",
  "headache",
];
const validFlavors = [
  "sweet",
  "sweeet",
  "sour",
  "blueberry",
  "bitter",
  "salty",
  "spicy",
  "fruity",
  "citrusy",
  "herbaceous",
  "woody",
  "earthy",
  "pungent",
  "spicy",
  "peppery",
  "floral",
  "flowery",
  "fizzy",
  "dry",
  "vanilla",
  "pepper",
  "pine",
  "tree fruit",
  "berry",
  "butter",
  "mint",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Strain",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,

        //CONSTRAINT: 'Strain name must be unique'
        unique: {
          args: true,
          msg: `A Strain with that name already exist. Strain name must be unique`,
        },

        // VALIDATOR: 'not empty', 'not null'
        validate: {
          notEmpty: { msg: "The name can't be empty " },
          notNull: { msg: "The name is required" },
          len: [1, 255],
        },
      },
      aka: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("aka").split(",");
        },
        set(aka) {
          this.setDataValue("aka", aka.join().toLowerCase());
        },
      },
      thc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "The THC value must be greater than 0",
          },
          max: {
            args: [100],
            msg: "The THC value must be less than 100",
          },
          isInt: { msg: "THC must be an integer" },
          notNull: { msg: "THC is required" },
        },
      },
      cbd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "CBD must be greater or equal to 0",
          },
          max: {
            args: [100],
            msg: "CBD must be less or equal to 100",
          },
          isInt: { msg: "CBD must be an integer" },
          notNull: { msg: "CBD is required" },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "The picture is required" },
          isUrl: { msg: "The picture must be a valid URL" },
        },
      },
      feelings: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("feelings").split(",");
        },
        set(feelings) {
          this.setDataValue("feelings", feelings.join().toLowerCase());
        },
        validate: {
          isFeelingsValid(value) {
            if (!value) {
              throw new Error("feelings require at least one feeling");
            }
            if (value.split(",").length > 3) {
              throw new Error("feelings can only have 3 feelings");
            }
            value.split(",").forEach((feeling) => {
              if (!validFeelings.includes(feeling)) {
                throw new Error(
                  `${feeling} is not a valid feeling, valid feelings are ${validFeelings.join(
                    ", "
                  )}`
                );
              }
            });
          },
        },
      },
      negatives: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("negatives").split(",");
        },
        set(negatives) {
          this.setDataValue("negatives", negatives.join().toLowerCase());
        },
        validate: {
          isNegativesValid(value) {
            if (!value) {
              throw new Error("negatives require at least one negative");
            }
            if (value.split(",").length > 3) {
              throw new Error("negatives can only have 3 negatives");
            }
            value.split(",").forEach((negative) => {
              if (!validNegatives.includes(negative)) {
                throw new Error(
                  `${negative} is not a valid negative, valid negatives are ${validNegatives.join(
                    ", "
                  )}`
                );
              }
            });
          },
        },
      },
      flavors: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("flavors").split(",");
        },
        set(flavors) {
          this.setDataValue("flavors", flavors.join().toLowerCase());
        },
        validate: {
          isFlavorsValid(value) {
            if (!value) {
              throw new Error("flavors require at least one flavor");
            }
            if (value.split(",").length > 3) {
              throw new Error("flavors can only have 3 flavors");
            }
            value.split(",").forEach((flavor) => {
              if (!validFlavors.includes(flavor)) {
                throw new Error(
                  `${flavor} is not a valid flavor, valid flavors are ${validFlavors.join(
                    ", "
                  )}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true, // true by default
      createdAt: "created", // default name of the createdAt column
      updatedAt: false, // default name of the updatedAt column
    }
  );
};
