;
'use strict'
const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  usuarioControl = require("../controlador/usuario.control"),
  passwordControl = require("../controlador/middlewares/password.control"),
  authControl= require("../controlador/middlewares/auth.control"),
  rolControl = require("../controlador/middlewares/rol.control");


api.get("/users", authControl.auth, usuarioControl.getUsers);
api.get("/users/:name", authControl.auth, usuarioControl.getUserByName);
api.get(
  "/user/:id",
  [authControl.auth, rolControl.adminRol],
  usuarioControl.getUserByID
);

api.post("/user", passwordControl.codificarPassword, usuarioControl.postUser);
api.post("/login", usuarioControl.loginUsers);
api.patch("/user/:id", authControl.auth, usuarioControl.patchUser);
api.delete("/user/:id", authControl.auth, usuarioControl.deleteUser);

module.exports = api;
