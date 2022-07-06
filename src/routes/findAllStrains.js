const { Strain } = require("../db/sequelize"); // require the strain model
const { Op } = require("sequelize"); // require the Op model
const auth = require("../auth/auth"); // require the auth middleware

module.exports = (app) => {
  // export the function that will be used in app.js
  app.get("/api/strains", auth, (req, res) => {  // add the auth middleware as a second argument !
    // get all strains
    if (req.query.name) {
      // if the query contains a name
      const name = req.query.name; // get the name in a variable
      const defaultLimit = 2; // set the default limit to 2
      const limit = parseInt(req.query.limit) || defaultLimit; // get the limit in a variable or set it to default (2) if it's not set

      if (name.length < 1) {
        // if the name is less than 2 characters
        const message = "The research query must be at least 1 characters"; // build the message
        return res.status(400).json({ message }); // send the message with the status 400 (bad request)
      } else {
        return Strain.findAndCountAll({
          // find all strains with the name in the query and the limit in the query or set it to default (2) if it's not set
          where: {
            name: {
              // name is propriety of the Strain model
              [Op.like]: `%${name}%`, // name is the criteria to search for. The operator [Op.like] is used to search for a string that contains the name. The % is used to search for a string that starts with the name and ends with the name. for example if the name is "cannabis" the query will search for a string that starts with "cannabis" and ends with "cannabis". If the search contains nabi in the name, the query will search for a string that contains "nabi" inside the name.
            },
          },
          order: [["name", "ASC"]], // order the results by name ASC (ascending) (ASC is the default order) (DESC is the other order)
          limit: limit, // limit the number of results to the limit set in the query or set it to default (2) if it's not set
        }).then(({ count, rows }) => {
          // if the query is successful and the results are found (count is the number of results and rows is the results) then build the message and send it with the status 200 (OK) and the results
          if (count === 0) {
            // if there is no strain with the name
            const message = `No strain found with the name '${name}'. Would you please try another query`; // build the message
            return res.status(404).json({ message }); // send the message with the status 404 (not found)
          }
          if (count < limit) {
            // if the number of results is less than the limit
            const message =
              "Only " +
              count +
              " strains found with the name " +
              name +
              ". We've returned " +
              (limit - count) +
              " results"; // build the message (count is the number of results, limit is the limit set in the query or set it to default (2) if it's not set)
            return res.status(200).json({ message, data: rows }); // send the message and the data with the status 200 (ok)
          }
          const message = `There are ${count} strains containing the name '${name}'. We've returned ${limit} results`; // build the message
          res.json({ message, data: rows }); // send the message and the data
        });
      }
    } else {
      Strain.findAll()
        .then((strains) => {
          // find all strains
          const message = "There are " + strains.length + " strains found."; // build the message
          res.json({ message, data: strains }); // send the message and the data
        })
        .catch((err) => {
          // if an error occurs
          const message =
            "We are sorry but an error occured while getting all strains. Try again in few minutes"; // build the message
          res.status(500).json({ message, data: error }); // send the error message
        });
    }
  });
};
