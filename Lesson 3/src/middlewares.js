const express = require("express");
const session = require("express-session");
const currentUserMiddleware = require('./middlewares/user-middleware');
const port =  3000;
try {
  const server = express();
  
  server.use((req, res, next) => {
    console.log(`The url is: ${req.url}`);
    next();
  })

  //middlware on get
  server.get('/currentUsers', currentUserMiddleware, (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  
  // server.use((req, res, next) => {
  //   console.log(req.url);
  //   next();
  // });
} catch (e) {
  console.log(e);
}
