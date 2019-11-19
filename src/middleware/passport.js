const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const db = require("../config/db")


passport.use(new LocalStrategy((username, password, done) => {
  if(username === "" || password === "") {
    return done(null, false, {message: "tidak boleh ada yang kosong"})
  }
  db.query("SELECT * FROM users WHERE username=?", [username], (err, user) => {
    if (err) done(null, false, {message: "username atau password salah"})
    if (!user[0]) {
      return done(null, false, {message: "Username tidak terdaftar"})
    } else {
      bcrypt.compare(password, user[0].password, (err, res) => {
        if(!res) {
          return done(null, false, {message: "username atau password salah"})
        }
        return done(null, user[0])
      })
    }
  })
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})


module.exports = passport
