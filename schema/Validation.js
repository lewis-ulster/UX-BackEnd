
//VALIDATION

const joi = require('@hapi/joi');


//REGISTER

const RegisterValidation = body => {
const schema = joi.object ({
    name: joi.string()
        .min(6)
        .required(),
    email: joi.string()
        .min(6)
        .email()
        .required(),
    permission : joi.string(),
    password: joi.string()
        .alphanum()
        .min(8)
        .required()
})


return schema.validate(body);

}

//LOGIN

const LoginValidation = body => {
    const schema = joi.object ({
        email: joi.string()
            .min(6)
            .email()
            .required(),
        password: joi.string()
            .alphanum()
            .min(8)
            .required()
    })

    return schema.validate(body);
    
    }

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;