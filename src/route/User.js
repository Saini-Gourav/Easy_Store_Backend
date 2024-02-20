const { Router } = require("express");
const { createData, getData, updateData, deleteData, createLogin, getLogin, register, login, filterData } = require("../controller/User");

const multer = require("multer");
const { checkAuth } = require("../middleware/checkAuth");
// const { checkAuth } = require("../middleware/checkAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const userRouter = Router();

userRouter.post("/create", upload.single("image"), createData);

userRouter.get("/get", getData);

userRouter.put("/update/:_id", upload.single("image"), updateData);

userRouter.delete("/get/:_id",deleteData)

/////////////////////////DashBoard/////////////////////

userRouter.post("/login", createLogin);
userRouter.get("/getlogin",getLogin);

/////////////////////////Website//////////////////////
userRouter.post("/register",register);
userRouter.post("/login/auth",login);
userRouter.get("/get/items/:category",checkAuth,filterData)
// userRouter.get("/get/items/check/auth",checkAuth)

////////////////////////

module.exports = userRouter;
