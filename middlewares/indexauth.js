const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


module.exports.isLoggedIn = async function( req , res , next ){

    const token = req.cookies.token;

    if(!token) {
        res.redirect('/');
        return ;
    }

    try {
        const decoded = jwt.verify( token , process.env.JWT_SECRET);
        console.log(decoded)
        if(decoded) {
            req.user = decoded ;
            next()
        }
        else {
            res.redirect("/");
        }
    } catch {
        res.redirect("/");
    }
}

