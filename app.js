// requires //////////////////////////////////////////////////////////////////////////////
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express(); // create the app
const port = process.env.PORT || 3000; // set the port to listen to (default is 3000) for localhost or the port set in the environment variable PORT if it exists (heroku) or 3000 if it doesn't exist (local)

// App uses ( Middlewares ) /////////////////////////////////////////////////////////////
// Attention à l'ordre des middlewares !

app
  .use(favicon(__dirname + "/favicon.ico")) // use the favicon middleware
  .use(bodyParser.json()); // use the bodyParser middleware

// init Sequelize ///////////////////////////////////////////////////////////////////////
sequelize.initDb(); // init the database

// endpoints ////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.json('Hello, Heroku ! 👋')
  })

require("./src/routes/findAllStrains")(app);
require("./src/routes/findStrainByPk")(app);
require("./src/routes/createStrain")(app);
require("./src/routes/updateStrain")(app);
require("./src/routes/deleteStrain")(app);
require("./src/routes/login")(app);

// Error 404 gestion ////////////////////////////////////////////////////////////////////
app.use(({ res }) => {
  const message = `We are sorry, but we are unable to find the ressource you've requested. Try another URL`; // build the message
  res.status(404).json({ message }); // send the message and the data with the status 404 (not found) (the message is sent in the body)
});

//start server
app.listen(port, () =>
  console.log(
    `Strains app listening on port ${port} sur localhost (http://localhost:3000)!`
  )
);

// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error
// 501 - Not Implemented
// 502 - Bad Gateway
// 503 - Service Unavailable
// 504 - Gateway Timeout
// 505 - HTTP Version Not Supported
// 200 - OK
// 201 - Created
// 204 - No Content
// 206 - Partial Content
// 301 - Moved Permanently
// 302 - Found
// 303 - See Other
// 304 - Not Modified
// 307 - Temporary Redirect
// 308 - Permanent Redirect
