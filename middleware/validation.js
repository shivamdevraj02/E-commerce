const { check } = require("express-validator");

exports.signupValidation = [
    check("name")
        .notEmpty()
        .withMessage("Full Name is required")
        .isLength({ min: 3 })
        .withMessage("Full Name must be at least 3 characters long"),

    check("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    check("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

    check("confirmPassword")
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })
];

