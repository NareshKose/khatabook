const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const hisaabModel = require("../models/hisaabModel")
const bcrypt = require("bcrypt");

module.exports.homepageController = function (req, res) {
  let message = req.flash("error");
  res.render("index", { isloggedin: false, });
};

module.exports.loginController = async function( req , res , next){
  const { email , password} = req.body ;

  if( !email || !password){
    req.flash("error", "All fields are required");
    res.redirect("/");
    return 
  }

  const user = await userModel.findOne({email});

  if(!user){
    res.redirect("/");
    return ;
  }

  const isMatch =  await bcrypt.compare(password, user.password);

  if(!isMatch){
    res.redirect("/");
    return ;
  }
  else{
    const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET);
    res.cookie("token", token)
    res.redirect("/profile");
  }
}


module.exports.profileController = async function (req, res, next) {

  // console.log(req.user) ;

  const id = req.user.id;

  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const order = req.query.byDate ? Number(req.query.byDate) : -1;

  const user = await userModel.findOne({_id : id});

  const hisaabs = await hisaabModel.find({ 
    user : user._id ,
    createdAt : {
      $gte : startDate ? new Date(startDate) : new Date(0),
      $lt: endDate ? new Date(endDate) : new Date()
    }
  }).sort({createdAt : order}).exec();

  res.render("profile",{ isloggedin : true , user , hisaabs});
};

module.exports.logoutController = async function (req, res, next) {
  res.clearCookie("token");
  res.redirect("/")

};

module.exports.registerPageController = async function (req, res, next) {
  res.render("register", { isloggedin: false });
};

module.exports.registerController = async function(req , res , next){
  const{ username , email , password} = req.body ;
  
  if( !username || !email || !password){
    req.flash("error", "all fields are required")
    return res.redirect("/register");
  }
  
  const emailUser = await userModel.findOne({email });

  if(emailUser){
    req.flash("error" , "user already exists");
    return res.redirect("/register");
  }

  const userNameUser = await userModel.findOne({username });

  if(userNameUser){
    req.flash("error" , "user already exists");
    return res.redirect("/register");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password , salt);

  const newUser = new userModel(
    {
      username ,
      email ,
      password : hashedPassword ,
    }
  );

  await newUser.save();

  const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.redirect("/profile");

  }
