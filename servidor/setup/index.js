;
'use strict'
const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3500;

app.listen(port, (err) => {
  !err
    ? console.log(`El servidor esta corriendo en el puerto http://localhost:${port}/`)
    : console.log(`El servidor no esta trabajando`);
});
