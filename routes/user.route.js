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
    user.username = req.body.username

    try {
      const hash = await bcrypt.hash(req.body.password, 10)
      user.password = hash 
      await user.save()
            res.redirect("/user/login");
    }
    catch (error){
      //console.log(user)
            res.redirect("/user/signup")
    }
  
})

//Login page 
router.get("/login", (req, res) => {
  res.render("login")
})

//Handling the login page
router.post("/login", async (req, res) => {
  
  const user = await User.findOne({username: req.body.username })

  if (user) {

    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    
    if(correctPassword) {
      req.session.currentUser = user 
      res.redirect('/')

    } else {
      res.redirect('/user/login')
    }

  } else {
    res.redirect('/user/signup')
  }
})


//export our routers
module.exports = router;
