const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserService {

    async store (req)
    {
        const pass = bcrypt.hashSync(req.body.password, 10);
        let dataCreate = req.body;
        dataCreate.password = pass;
        const user = await User.create(dataCreate);
        return user;
    }
};

module.exports = UserService;