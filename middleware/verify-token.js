const jwt = require("jsonwebtoken");

//Models
const ApiResponse = require("../models/ApiResponse");

module.exports = (req, res, next) => {

  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token;

  console.log('Verify Token :' + token);

  const browser =
    req.headers["x-browser"]

  next();

};
