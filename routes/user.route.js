const router = require("express").Router();
const bcrypt = require('bcrypt')

/* GET signup page */
router.get("/signup", (req, res) => {
  res.render("signup");
});

//Handling the form of signup
router.post("/signup", (req, res) => {
    res.redirect("login");
})
module.exports = router;
