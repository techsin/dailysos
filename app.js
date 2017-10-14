const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

const logger = require('morgan');
app.use(logger('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const favicon = require('serve-favicon');
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

//need to add postgresql for sessions
const session = require('express-session');
app.use(session(({ secret: 'ifsdnoiv39noin3930808fg809sd8gfhn8nnc9jie0', resave: false, saveUninitialized: true })));

//authentication
const passport = require('./middlewares/auth');
app.use(passport.initialize());
app.use(passport.session());

//load Views
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({
    layoutsDir: './views/layouts',
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);

//load controllers (routes)
const controllers = require('./controllers');
app.use(controllers);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//load Models
const models = require('./db/models');
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is up and running on port ${PORT}`);
    });
});
