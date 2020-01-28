const config = require('config')
module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined");
        //always throw error objects instead of string, to get the error
        //stack trace
    } 
}