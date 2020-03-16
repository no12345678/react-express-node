const sql = require("mssql");
const port = 3000;

(async () => {
  try {    
    const connectionsPool = await getConnectionsPool();
    //executeGetQueries();    
    //executeGetQueriesWithSeveralRecordSets();
    //executeUpdateQuery();
    executeStoredProcedure();

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

    async function executeGetQueries(){
      // const whereCondition = "1";
      // let result = await sql.query
      // ("select * from projects where projectid = " +  whereCondition);
      const sqlInjectionCondition = "1 or 1=1"
      // let result = await sql.query
      // ("select * from projects where projectid = " + sqlInjectionCondition);
      // let result = await connectionsPool.request()
      // .input("param", sql.NVarChar, sqlInjectionCondition)
      // .query(`select * from projects where projectid = @param`);
      result = await sql.query `select * from projects where projectid = ${sqlInjectionCondition}`;
      console.log(result);
    }

    async function executeGetQueriesWithSeveralRecordSets(){
      const result = await sql.query`select * from projects where projectid = 1;select * from files`;
      //console.log(result);
      console.log(result.recordsets[1]);
    }

    async function executeUpdateQuery(){
      const result = await sql.query `update files set FileName = 'Updated File Name' Where fileid = 1`;
      console.log(result);
    }

    async function executeStoredProcedure(){
      const result = await connectionsPool.request()
                    .input("id", sql.Int, 1)
                    .execute("GetProjectByID");
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
})();
