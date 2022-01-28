const jwt=require("jsonwebtoken")

const TOKEN_KEY="tokenpassinusershowdataandshowmassage"

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  //  token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    console.log(req.user)
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;

