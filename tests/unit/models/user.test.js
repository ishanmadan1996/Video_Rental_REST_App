const {User} = require("../../../models/user");
const jwt = require("jsonwebtoken");
const config = require('config');
const mongoose = require('mongoose');
describe('user.generateAuthToken', ()=>{
    it("should return a valid JWT", ()=>{
        const payload = {
            _id:mongoose.Types.ObjectId().toHexString(), isAdmin: true
        }
        const user = new User(payload);
        const token = user.generateAuthToken();

        // jest configures the NODE_ENV to test by default, hence it looks for the env settings titled 'test.json' in config folder
        // hence it will take the value of the env var jwtPrivateKey from test.json config file.
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    });
});