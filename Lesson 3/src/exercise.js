const sql = require("mssql");
const port = 3000;

const express = require("express");
const session = require("express-session");
(async() => {

try {
  const server = express();
  setSession();

  const connectionsPool = await getConnectionsPool();
  
  server.get('/connect', (req, res) => {
    if(req.session.user == null){
      req.session.user = {name: 'Maor Edri'};
    }

    res.send("connected!");
  })


  async function getConnectionsPool(){
    const config = {
      user: "mftfullstackadmin",
      password: "Admin123",
      server: "mft-full-stack.database.windows.net",
      database: "MftFullStack",
      encrypt: true
    };
    const pool = await sql.connect(config);
    console.log("Connected")

    return pool;
  }

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
  
  server.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
} catch (e) {
  console.log(e);
}

})();
