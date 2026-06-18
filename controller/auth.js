const { validationResult } = require("express-validator");
const User_Ecommerce = require("../model/main");


exports.getsignup = (req, res, next) => {
    res.render("auth/signup", {
        pageTitle: "Signup",
        isLoggedIn: req.isLoggedIn
    });

}

exports.postsignup = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render("auth/signup", {
            pageTitle: "Signup",
            errorMessage: errors.array()[0].msg,
            oldInput: req.body,
            isLoggedIn: req.isLoggedIn
        });
    }

    const { name, email, password } = req.body;



    const user = new User_Ecommerce({
        name,
        email,
        password
    });

    user.save()
        .then(() => {
            console.log("User Saved");
            res.redirect("/login");
        })
        .catch(err => {
            console.log(err);
        });
}



exports.getlogin = (req, res) => {
    res.render("auth/login", {
        pageTitle: "Login",
        isLoggedIn: req.isLoggedIn,
        error: null,
        errorType: null
    });
}


exports.postlogin = async (req, res) => {

    const { email, password } = req.body;

    const user = await User_Ecommerce.findOne({ email });

    if (!user) {
        return res.render("auth/login", {
            pageTitle: "Login",
            error: "Account not found. Please sign up first.",
            errorType: "not-signed-up",
            isLoggedIn: false
        });
    }

    if (user.password !== password) {
        return res.render("auth/login", {
            pageTitle: "Login",
            error: "Incorrect password. Please try again.",
            errorType: "wrong-password",
            isLoggedIn: false
        });
    }

    req.session.isLoggedIn = true;

    req.session.save(() => {
        res.redirect("/");
    });
}


exports.postlogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
}