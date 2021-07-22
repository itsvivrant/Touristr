const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set the _csrf token and create req.csrfToken method
app.use(
  csrf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);


// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(routes); // Connect all the routes


//phase 2 :
//* Make sure to test the error handlers to see if it's working. Just go to an
//* unknown route

//Resource not Found Error Handler
/* If this resource not found middleware is called, an error will be created with the message
"The requested resource couldn't be found." and a status code of 404. Afterwards, next will be
invoked with the error. Remember, next invoked with nothing means that error handlers defined
after this middleware will not be invoked. However, next invoked with an error means that
error handlers defined after this middleware will be invoked
*/
app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
})

//Sequelize Error-Handler
const { ValidationError } = require('sequelize');
/*
If the error that caused this error-handler to be called is an instance of ValidationError
from the sequelize package, then the error was created from a Sequelize database validation
error and the additional keys of title string and errors array will be added to the error and
passed into the next error handling middleware
*/
app.use((err, req, res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

//Error Formatter Error-Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
