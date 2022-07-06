const { Strain } = require("../db/sequelize"); // require the strain model
const auth = require("../auth/auth");

module.exports = (app) => {
  app.get("/api/strains/:id", auth, (req, res) => {
    Strain.findByPk(req.params.id)
      .then((strain) => {
        if (strain === null) {
          const message = `The strain with the id ${req.params.id} was not found ! Try with another identifier.`;
          return res.status(404).json({ message });
        }

        const message = "A strain was found !";
        res.json({ message, data: strain });
      })
      .catch((error) => {
        const message =
          "We are sorry but an error occured while getting the strain. Try again in few minutes.";
        res.status(500).json({ message, data: error });
      });
  });
};