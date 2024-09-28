const hisaabModel = require("../models/hisaabModel");
const userModel = require("../models/userModel");

module.exports.createPageController = async function (req, res, next) {
  res.render("create", {isloggedin : true});
};

module.exports.createHisaabController = async function( req , res , next){
  const { title , description} = req.body;

  if( !title || !description){
 req.flash("error", "All fields are required");
  }

  const isEditable = req.body.editpermissions == 'on' ? true : false ;
  const isEncrypted = req.body.encrypted == 'on' ? true : false ;
  const shareable = req.body.shareable == 'on' ? true : false ;
  const passcode = req.body.passcode;
  
  const newHisaab = new hisaabModel({
    user : req.user.id ,
    title ,
    data : description ,
    editable : isEditable ,
    isEncrypted ,
    passcode ,
    shareable
  })

  await newHisaab.save();

  res.redirect("/profile");

}


module.exports.readHisaabController = async function (req, res, next) {

  const id = req.params.id;
  console.log(id)

  const hisaab = await hisaabModel.findOne({ _id : id});
  // console.log(hisaab)

  if(!hisaab){
    return res.redirect("/profile");
  }

  if(hisaab.isEncrypted){
    return res.render("passcode", { isloggedin : true , id})
  }

  return res.render("hisaab" , { isloggedin : true , hisaab} );
};


module.exports.readVerifiedHisaabController = async function (req, res, next) {

  const id = req.params.id;

  const hisaab = await hisaabModel.findOne({ _id : id})

  if(!hisaab){
    return res.redirect("/profile");
  }

   if(hisaab.passcode !== req.body.passcode){
    return res.redirect("/profile");
   }


  return res.render("hisaab",{isloggedin : true , hisaab});
};

module.exports.deleteController = async function(req , res , next){
  
  const id = req.params.id;
   
  const hisaab = await hisaabModel.findOne({
    _id : id ,
    user : req.user.id // to check whether the req user has the  hisaab or not and if it is not that user it will not give hisaab
    
  });

  if( !hisaab){
    return res.redirect("/profile");
  }

  await hisaabModel.deleteOne({
    _id : id
  })

  return res.redirect("/profile");

}

module.exports.editController = async function( req , res , next){

  const id = req.params.id;

  const hisaab = await hisaabModel.findById(id);

  if(!hisaab){
    return res.redirect("/profile");
  }

  return res.render("edit" , { isloggedin : true , hisaab});

}

module.exports.editPostController = async function( req , res , next){

  const id = req.params.id;

  const hisaab = await hisaabModel.findById(id);

  if(!hisaab){
    return res.redirect("/profile");
  }

  hisaab.title = req.body.title ;
  hisaab.data = req.body.description;
  hisaab.editable = req.body.editpermissions == 'on' ? true : false ;
  hisaab.isEncrypted = req.body.encrypted == 'on' ? true : false ;
  hisaab.shareable = req.body.shareable == 'on' ? true : false ;
  hisaab.passcode = req.body.passcode;

  await hisaab.save();

  res.redirect("/profile");

}



