const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const inProduction = process.env.NODE_ENV === "production";
const app = express();

const keys = require('./config/keys.js')
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const logger = require("morgan");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.disable("x-powered-by");
app.use(logger("dev"));
// app.use(require("cookie-parser"));
app.use(cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [keys.session.cookieKey]
	})
);
const models = require("./backend/db/models");

//need to add postgresql for sessions
const session = require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var sessionStore = new SequelizeStore({
	db: models.sequelize,
	checkExpirationInterval: 15 * 60 * 1000,
	expiration: 7 * 24 * 60 * 60 * 1000
 });

app.use(
	session({
		store: sessionStore,
		secret: "ifsdnoiv39noin3930808fg809sd8gfhn8nnc9jie0",
		resave: false,
		saveUninitialized: true
	})
);

const favicon = require("serve-favicon");
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (inProduction) {
	app.set("trust proxy", 1); // trust first proxy
	// session.cookie.secure = true; //ssl
} else {
	app.disable("view cache");
}

//authentication
const passport = require("./backend/middlewares/auth");
app.use(passport.initialize());
app.use(passport.session());

//load Views
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./backend/views"));

//load controllers aka routes
const controllers = require("./backend/controllers");
app.use(controllers);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = inProduction ? {} : err;

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

// load Models
models.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is up and running on port ${PORT}`);
	});
});
