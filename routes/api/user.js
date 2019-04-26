const express = require("express");
const router = express.Router();

// User Model
const User = require("../../models/Users");

// GET route for api/user
// GET all Users
// Authentication???
router.get('/', (req, res) => {
     User.find().then(user => res.json(user))
}); 

// POST route fo api/user
// Create a Post
// Authentication???
router.post("/register", (req, res) => {
     // validation
     const { errors, isValid } = validateRegisterInput(req.body);
     if (!isValid){
          return res.status(400).json(errors);
     }
     User.findOne({email: req.body.email}).then(user => {
          if (user) {
               return res.status(400).json ({email: "Email already exists"});
          }
     })
     const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password:req.body.password
     });
     newUser.save().then(user => res.json(user));
});

// //DELETE api/user/:id
// //DELETE a User
// router.delete("/:id", (req, res) => {
//      User.findById(req.params.id)
//           .then(item => item.remove().then(() => res.json({success: true})))
//           .catch(err => res.status(404).json({ success: false}))
// });

module.exports = router;