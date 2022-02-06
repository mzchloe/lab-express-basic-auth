const router = require("express").Router();
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

/* GET signup page */
router.get("/signup", (req, res) => {
  res.render("signup");
});

//Handling the form of signup
router.post("/signup", async (req, res) => {
    const user = new User()
    user.email = req.body.email

    try {
      user.password = await bcrypt.hash(req.body.password, 10)
      await user.save()
            res.redirect("/user/login");
    }
    catch (error){
        console.log(user)
            res.redirect("/user/signup")
    }
  
})
module.exports = router;
