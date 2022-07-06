const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    // If no token is provided
    const message = `You did not provide the token. You must add it to the header.`;
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1]; // Get the token from the header (split the string to get the token) bacause the token is the second part of the string
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    // Verify the token
    if (error) {
      const message = `The user is not authorized to access this ressource.`;
      return res.status(401).json({ message, data: error });
    }

    const userId = decodedToken.userId; // Get the user id from the token
    if (req.body.userId && req.body.userId !== userId) {
      // If the user id in the body is different from the user id in the token
      const message = `The user id is not correct.`; // Return an error
      res.status(401).json({ message });
    } else {
      next(); // If the user id in the body is the same as the user id in the token, continue the request
    }
  });
};
