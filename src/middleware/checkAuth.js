const jwt = require("jsonwebtoken");
const secretkey = "gouravsaini";

exports.checkAuth = (req, res, next) => {
  try {
    // console.log(req.body)

    // const token = req.body.Authorization;
    // const token = req.headers("Authorization");
      //  const token = req.headers.Authorization.split(" ")[1];
      //  const token = req.headers.Authorization.split(" ")[1];

      const token = req.headers.authorization;


    console.log(token,"formMiddle")
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // return res.json(data)
    const decodedToken = jwt.verify(token, secretkey);
    console.log(decodedToken,"checkDecode")
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};
