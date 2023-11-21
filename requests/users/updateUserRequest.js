const joi = require('joi');

class UpdateUserRequest{

    constructor(){
        this.redirectUrl  = '/users/edit';
    }
    rules(){
        return joi.object({
            name: joi.string().required(),
            age:joi.number().required(),
            password: joi.required()
        }).unknown();
    }

    validate = (req,res,next) => {
        const {error, value} = this.rules().validate(req.body ,{ abortEarly:false });
        if(error){
            req.session.error = error.details;
            req.session.data = req.body;
            return res.redirect(this.redirectUrl);
        }
        req.session.error = null;
        req.session.data = null;
        next();
    }
}

module.exports = new CreateUserRequest().validate;
