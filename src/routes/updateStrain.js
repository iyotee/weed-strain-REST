const { Strain } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/strains/:id", (req, res) => {
    const id = req.params.id;
    Strain.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Strain.findByPk(id).then((strain) => {
          if (strain === null) {
            const message = `The strain with the id ${id} was not found ! Try with another identifier.`;
            return res.status(404).json({ message });
          }

          const message = `The strain with the name ${strain.name} was updated !`;
          res.json({ message, data: strain });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res
            .status(400)
            .json({ message: "error.message", data: error });
        }
        const message = `We are sorry but an error occured while updating the strain. Try again in few minutes.`;
        res.status(500).json({ message, data: error });
      });
  });
};
