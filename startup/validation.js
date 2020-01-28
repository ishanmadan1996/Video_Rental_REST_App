const Joi = require("joi"); // we use Joi to validate input to API
module.exports = function(){
    Joi.objectId = require("joi-objectid")(Joi);
}