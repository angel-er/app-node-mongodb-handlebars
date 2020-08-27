const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectFlash = require('connect-flash');
const sessionExpress = require('express-session');
const passport = require('passport');

const {SECRET_KEY} = require('./config/db');
const {UserRoutes, NotesRoutes, IndexRoutes} = require('./routes');

// Initializations
const app = express();
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(
  sessionExpress({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());

// Globals Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  // estos dos misddlewRES son de PASSPORT
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/', IndexRoutes);
app.use('/notes', NotesRoutes);
app.use('/users', UserRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
