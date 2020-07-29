
;
'use strict'
const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  fileRutas = require("../rutas/files.ruta"),
  cursoRutas = require("../rutas/curso.ruta"),
  usuarioRutas = require("../rutas/usuario.ruta"),
  rolesRuta = require("../rutas/roles.ruta"),
  db = connectDB(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

//Cors configuration
app.use(cors(corsOptions));

//Session
app.use(session({ secret: 'somevalue' }));
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Session examples to verificate
app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/", (req, res) => {
  res.send(
    `Your session: ${req.sessionID}, number of visits: ${req.session.views["/"]} times`
  );
});

//Routes
app.use("/api", fileRutas);
app.use("/api", usuarioRutas);
app.use("/api", cursoRutas);
app.use("/api", rolesRuta);

module.exports = app;
