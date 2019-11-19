const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const logger = require('morgan')
const helmet = require('helmet')
const flash = require('express-flash')
const csrf = require('csurf')
const compression = require('compression')
const csrfProtection = csrf()
const app = express()
const TWO_HOURSE = 1000 * 60 * 60 * 2
const PORT = 3000
app.use(helmet())
app.use(compression())
app.set(helmet.hidePoweredBy())
app.use(express.static(__dirname + '/src/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))
const db = require('./src/config/db')
const Auth = require('./src/controllers/Auth')
const dashboard = require('./src/routes/dashboard')
// const auth = require("./src/routes/auth")(passport)
const { redirectHome } = require('./src/middleware/authentication')
const passport = require("./src/middleware/passport")

app.use(flash())

// Express session middleware
app.use(session({
	secret: '7qvt6t2738',
	resave: false,
	saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())


app.use('/', dashboard)

app.get('/masuk', redirectHome, csrfProtection,Auth.getLogin)
app.post("/masuk", passport.authenticate("local", {
	successRedirect:"/",
	failureRedirect:"/masuk",
	failureFlash: true
}) , csrfProtection, Auth.postLogin)

app.get('/keluar', (req, res) => {
	req.logout()
	res.redirect("/masuk")
})

app.get('*', (req, res) => {
	res.render('page/404', {
		title: "404 | Halaman tidak di temukan", login: false
	})
})



app.listen(PORT, () => {
	console.log(`Server running in PORT:${PORT}`)
})


