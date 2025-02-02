const {check, body} = require("express-validator");
const {readJSON} = require("../data");

module.exports = [
    check("firstName")
        .notEmpty().withMessage("El nombre es obligatorio").bail()
        .isLength({
            min : 2
        }).withMessage("Mínimo 2 letras").bail()
        .isAlpha("es-ES", {
            ignore : " "
        }).withMessage("Solo caracteres alfabéticos"),

    check("lastName")
        .notEmpty().withMessage("El apellido es obligatorio").bail()
        .isLength({
            min : 2
        }).withMessage("Mínimo 2 letras").bail()
        .isAlpha("es-ES", {
            ignore : " "
        }).withMessage("Solo caracteres alfabéticos"),

    body("email")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .isEmail().withMessage("Debe ser un email con formato válido")
        .custom((value, {req}) => {
            let user = readJSON("users.json").find(user => user.email === value);

            return user ? false : true
        }).withMessage("El email ya se encuentra registrado"),

    check("email2")
        .notEmpty().withMessage("El email es obligatorio").bail()
        .custom((value, {req}) => {
            if(value !== req.body.email){
                return false
            }
            return true
        }).withMessage("Los mails no coinciden"),

    check("password")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .isLength({
            min : 6,
            max : 12
        }).withMessage("La contraseña debe tener entre 6 y 12 caracteres").bail(),

    body("password2")
        .notEmpty().withMessage("La contraseña es obligatoria").bail()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage("Las contraseñas no coinciden"),
]
    