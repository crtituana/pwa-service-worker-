const express = require("express");

let api = express.Router(),
  cursoControl = require("../controlador/curso.control"),
  authControl = require("../controlador/middlewares/auth.control");

//users ENDPOINT
api.get("/ cursos", authControl.auth, cursoControl.get);
api.get("/ curso/:_id", authControl.auth, cursoControl.getByID);

api.post("/ curso", authControl.auth, cursoControl.post);

api.patch("/ curso/:_id", authControl.auth, cursoControl.patch);

api.delete("/ curso/:_id", authControl.auth, cursoControl.deleteOne);

module.exports = api;
