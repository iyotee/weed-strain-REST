const { Strain } = require("../db/sequelize"); // require the strain model
const { ValidationError, UniqueConstraintError } = require("sequelize"); // require the ValidationError model
const auth = require("../auth/auth");


module.exports = (app) => {
  // export the function that will be used in app.js
  app.post("/api/strains", auth, (req, res) => {
    // create a strain
    Strain.create(req.body)
      .then((strain) => {
        // create the strain
        const message = "A Strain with id " + strain.id + " was created !"; // build the message
        res.json({ message, data: strain }); // send the message and the data
      })
      .catch((error) => {
        // if an error occurs
        if (error instanceof ValidationError) {
          // if the error is a ValidationError
          return res.status(400).json({ message: error.message, data: error }); // send the message and the data with the status 400 (bad request)
        }
        if (error instanceof UniqueConstraintError) {
          // if the error is a Error
          return res.status(400).json({ message: error.message, data: error }); // send the message and the data with the status 500 (internal server error)
        }
        const message =
          "We are sorry but an error occured while creating the strain. Try again in few minutes"; // build the message
        res.status(500).json({ message, data: error }); // send the error message
      });
  });
};
