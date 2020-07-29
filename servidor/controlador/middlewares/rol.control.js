const jwt = require("jsonwebtoken"),
  Rol = require("../../modelos/rolModel");

let adminRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Token invalido",
      });
    } else {
      Rol.find({ _id: decode.data.role })
        .then((data) => {
          if (data[0].name === "administrator") {
            next();
          } else {
            res.status(401).json({
              ok: false,
              data: null,
              msg: "Tu no tienes los permisos",
            });
          }
        })
        .catch((err) => {
          console.log("no - found");
        });
    }
  });
};

let clientRol = (req, res, next) => {
  let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Token invalido",
      });
    } else {
      Role.find({ _id: decode.data.role })
        .then((data) => {
          if (data[0].name === "client") {
            next();
          } else {
            res.status(401).json({
              ok: false,
              data: null,
              msg: "Tu no tienes los permisos",
            });
          }
        })
        .catch((err) => {
          console.log("no - found");
        });
    }
  });
};

module.exports = {
  adminRol,
  clientRol,
};
