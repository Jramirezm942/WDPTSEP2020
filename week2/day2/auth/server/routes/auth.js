const { Router } = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const passport = require("../config/passport")

const router = Router()

router.post("/signup", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: "Email or password empty"
    })
  }
  const user = await User.findOne({ email })
  if (user) {
    return res.status(400).json({
      message: "Email already taken"
    })
  }

  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(12))

  const newUser = await User.create({
    email,
    password: hashPass
  })

  res.status(201).json(newUser)
})

router.post("/login", (req, res, next) => {
  // no hay logica nuestra por aca...
  passport.authenticate("local", (err, user, errDetails) => {
    if (err) {
      return res.status(500).json({
        message: "Error"
      })
    }
    if (!user) {
      return res.status("401").json(errDetails)
    }

    req.login(user, err => {
      if (err) {
        return res.status(500).json({
          message: "Error"
        })
      }

      res.status(200).json(user)
    })
  })(req, res, next)
})

router.get("/logout", (req, res) => {
  req.logOut()
  res.status(200).json({ message: "Logged out" })
})

router.get("/current-user", (req, res) => {
  res.status(200).json(req.user || {})
})

module.exports = router
