const express = require("express");
const session = require("express-session");
const port = 3000;

try {
  const server = express();
  
  setSession();
  setRoutes();
  
  function setSession() {
    server.use(
      session({
        secret: "my-example-session",
        cookie: {
          maxAge: 10000000000000
        }
      })
      );
  }
  
  function setRoutes(){
    const authRoutes = require('./routes/auth');
    server.use("/auth", authRoutes);
  }
  
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
} catch (e) {
  console.log(e);
}
