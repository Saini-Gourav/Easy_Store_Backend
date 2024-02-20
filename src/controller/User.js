const userModel = require("../model/userModel");
const loginModel = require("../model/loginModal");
const registerModel = require("../model/Register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secretkey = "gouravsaini";

exports.createData = async (req, res, next) => {
  try {
    const { title, category, price } = req.body;
    // console.log(req.body);
    const file = req.file;
    const user = await userModel.create({
      title,
      category,
      price,
      image: file.path,
    });
    console.log(req.body)
    console.log(req.file)

    res.send({ status: 200, message: "Successful", data: user });
  } catch (error) {
    console.log(error);
    res.send({ status: 400, message: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const getData = await userModel.find();
    // console.log(getData, "let me check");
    res.send({ status: 200, message: "successful get data", data: getData });
  } catch (err) {
    console.log(err);
  }
};

exports.updateData = async (req, res) => {
  try {
    let product = await userModel.findById(req.params._id);
    // console.log({ product },"productCheck");
    console.log(req.file,"hiiii")
    
    if (product) {
      let image = product.image;
      let { title, category, price } = req.body;

      console.log(image,"pre");
      if (req.file) {
        let file = req.file;
        image = file.path;
        console.log(image,"next");
        // console.log({ file },"aja");
      }

      let where = { _id: req.params._id };
      let updateParams = { title, category, price, image };
      // console.log({ where, updateParams, product });
      // throw new Error("update ");
      let updateProduct = await userModel.updateOne(where, updateParams);
      if (updateProduct.modifiedCount > 0) {
        res.status(200).json({ success: true, message:"update successfully" });
      } else {
        throw new Error("something went wrong");
      }
    } else {
      throw new Error("no product find");
    }
  } catch (error) {
    res.status(400).json({ success: false, message: "galat" });
  }
};


exports.deleteData = async (req, res) => {
  try {
    const deleteRecord = await userModel.findByIdAndDelete(req.params._id);
    // console.log(deleteRecord,"check")
    if(!req.params._id)
    {
      return res.status(400).send();
    }
    res.send({ status: 200, message: "successfully delete data", data: deleteRecord });
  } catch (err) {
    res.status(500).send(err);
  }
};


////////////////////////////////////////////////////////////////////////////////


exports.createLogin = async (req, res) => {
  try {
    const { username,password } = req.body;
    const user = await loginModel.create({
      username,
      password,
    });

    res.send({ status: 200, message: "Successful", data: user });
  } catch (error) {
    // console.log(error);
    res.send({ status: 400, message: error.message });
  }
};

exports.getLogin = async (req, res) => {
  try {
    const data = await loginModel.findOne();
    res.json({ status: 200,
       message: "successful get Login data",data });
  } catch (err) {
    console.log(err);
  }
};
////////////////////////////////////////////////////

exports.register = async (req, res) => {
  try {
    const { username,email,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await registerModel.create({
      username,
      email,
      password: hashedPassword
    });
    const token = jwt.sign({userId:user._id,}, secretkey,{expiresIn: "1h"})
    res.status(200).json({ token, userId: user._id, data:user, message:"Successful" });
    
  } catch (error) {
    console.log(error);
    res.send({ status: 500, message: error.message });
  }
};

exports.login = async (req,res) => {
  try {
    const {username, password} = req.body;

    const user = await registerModel.findOne({username:username});
    // console.log(user,"findpass")
    // console.log(password,"req bala");
    // console.log(user.password,"userbala")

    if(!user)
    {
      return res.status(401).json({error:"Authentication failed user nahi h"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log(passwordMatch,"passwordCheck")
    if(!passwordMatch)
    {
      return res.status(401).json({ error: 'Authentication failed password match nahi hua' });

    }
    // res.json({message:"successful Login"})
    const token = jwt.sign({userId:user._id,}, secretkey,{expiresIn: "1h"})
    // console.log(token,"backendBalaToken")
    res.status(200).json({ token, userId: user._id, message:"successfully Login" });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed catch bala error' });
  }
}

// exports.login = async (req, res) => {
//   try {
//     const { username } = req.body;
//     console.log(req.body,"it's body");

//     const user = await registerModel.findOne({ username:username });
//     console.log(user, "findData");

    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Authentication failed' });
//   }
// };


///////////filter//////////////

exports.filterData = async (req, res) => {
  try {
    const category = req.params.category;
    // const category = req.params;
    console.log(req.body,"body me kya aya")

    
    const getData = await userModel.find({ category:category });
    console.log(getData,'filter data')

    res.send({ status: 200, message: `Successfully filtered data`,getData, category});
  } catch (err) {
    // console.error(err);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};





