const { Strain } = require("../db/sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.delete("/api/strains/:id", auth, (req, res) => {
    Strain.findByPk(req.params.id)
      .then((strain) => {
        if (strain === null) {
          const message = `Le strain demandé n'existe pas. Réessayez avec un autre identifiant.`;
          return res.status(404).json({ message });
        }

        return strain.destroy({ where: { id: strain.id } }).then((_) => {
          const message = `Le strain avec l'identifiant n°${strain.id} a bien été supprimé.`;
          res.json({ message, data: strain });
        });
      })
      .catch((error) => {
        const message = `Le strain n'a pas pu être supprimé. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
