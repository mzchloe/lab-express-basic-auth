const router = require("express").Router();
const bcrypt = require('bcrypt');
const isLoggedIn = require("../middleware/guard");

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
  const userFromDatabase = await User.findOne({username: req.body.username })

  if (userFromDatabase) {
    const correctPassword = await bcrypt.compare(req.body.password, userFromDatabase.password)
    
    if(correctPassword) {
      //setting up the user as authenticated user
      req.session.currentUser = userFromDatabase 
      res.redirect('/')

    } else {
      res.redirect('/user/login', { errorMessage: 'Incorrect password, please try again'})
    }

  } else {
    res.redirect('/user/signup')
  }
})

//get the main page
router.get('/main', isLoggedIn, (req, res) => {
  const user = req.session.currentUser
  res.render('main', { activeUser: req.session.currentUser })
})

//get the private page
router.get('/private', isLoggedIn, (req, res) => {
  const user = req.session.currentUser
  res.render('private', { activeUser: req.session.currentUser })
})

//export our routers
module.exports = router;
