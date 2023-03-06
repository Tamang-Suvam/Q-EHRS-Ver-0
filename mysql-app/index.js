var mysql = require("mysql");
const fs = require('fs');
const readline = require('readline');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sairam@123",
    database: "testdb"
});

function connectToDatabase(conn) {
    conn.connect((err) => {
        if (err) {
          console.log("Error occurred", err);
        } else {
          console.log("Connected to MySQL Server");
        }
    });
}

async function processLineByLine(conn) {
    const fileStream = fs.createReadStream('/home/suvam/Documents/QueriesFile/npmmysql/Queries10K.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    console.time('Time')
    for await (const line of rl) {
        conn.query(line, function (err, result) {
            if(err) {
                console.log(err)
            } 
            // else {
            //     console.log(result)
            // }
        })
    }
    console.timeEnd('Time')
  }
  
  connectToDatabase(connection)
  processLineByLine(connection);