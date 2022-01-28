const users = require("../Schema/Userschema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const auth = require("../Middelwer/Middelwer")
const express = require("express")
const TOKEN_KEY = "tokenpassinusershowdataandshowmassage";
const route = express.Router()

route.post('/signuser', async (req, res) => {
  try {
    let { email, password, cpassword } = req.body
    // console.log(req.body)
    const finduser = await users.findOne({ email });
    if (!finduser) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      cpassword = await bcrypt.hash(cpassword, salt);
     
      if (password == cpassword) {
        const token = jwt.sign(
          { email },
          TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        const adduser = await users.create({ email, password, cpassword, token });
        const usersave = await adduser.save();
        adduser.save((err)=>{

          
        });        // req.headers["x-access-token"]=adduser.token
        // save user token
        //   adduser.token = token;

        if (usersave) {
          res.status(200).json({ massage: "successfull singup",token: adduser.token})
        }
      } else {
        res.status(401).json({ massage: "password not match" })
      }
    }
    else {
      res.status(400).json({ massage: "User alredy exits" })
    }
  }
  catch (err) {
    console.log(err)
  }
})


route.post('/loginuser', async (req, res) => {
  let { email, password } = req.body
  const finduser = await users.findOne({ email });
  if (finduser) {
    const validPassword = await bcrypt.compare(password, finduser.password);
    const token = jwt.sign(
      { email },
      TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    )

   finduser.token = token
  await finduser.save();
    // req.headers["x-access-token"]=finduser.token 
    if (validPassword) {
      res.status(200).json({ message: "successfull login" ,token:finduser.token}); 
    } else {
      res.status(401).json({ error: "Invalid Password and username" });
    }
  } else {
    res.status(400).json({ massage: "User not valid" })
  }
})

route.get("/welcome", auth, (req, res) => {

  res.send("welcome brother auth complete")
})

module.exports = route