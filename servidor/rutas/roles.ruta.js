const express = require("express");

let api = express.Router(),
  rolControl = require("../controlador/roles.control"),
   authControl= require("../controlador/middlewares/auth.control");


api.get("/roles", authControl.auth, rolControl.get);
api.get("/rol/:_id", authControl.auth, rolControl.getByID);

api.post("/rol", authControl.auth, rolControl.post);

api.patch("/rol/:_id", authControl.auth, rolControl.patch);

api.delete("/rol/:_id", authControl.auth, rolControl.deleteOne);

module.exports = api;
