exports.product=(req, res, next) => {

  

    res.render("products", {
        pageTitle: "Products",
        isLoggedIn: req.isLoggedIn
    }
    )
}



exports.cart = (req, res, next) => {

    

    res.render("cart", {
        pageTitle: "Cart",
        isLoggedIn: req.isLoggedIn
    }
    );
}


exports.orders = (req, res, next) => {
    res.render("order", {
        pageTitle: "Orders"

        ,
        isLoggedIn: req.isLoggedIn

    }
    );

}