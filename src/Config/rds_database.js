// import mysql from "mysql2/promise"
// import AWS from "aws-sdk"

// import dotenv from 'dotenv'
// dotenv.config()

// AWS.config.update({ region: 'eu-north-1' });

// (async () => {
//   let password = process.env.RDS_PASSWORD;
  
//   let conn;
//   try {
//     conn = await mysql.createConnection({
//       host: 'my-tasks-tracker.cjm4i4eme77v.eu-north-1.rds.amazonaws.com',
//       port: 3306,
//       database: 'mysql',
//       user: 'admin',
//       password,
//       ssl: { rejectUnauthorized: false, ca: require('fs').readFileSync('/certs/global-bundle.pem') }
//     });

//     const [rows] = await conn.execute('SELECT VERSION() AS v');
//     console.log(rows[0].v);
//   } catch (error) {
//     console.error('Database error:', error);
//     throw error;
//   } finally {
//     if (conn) await conn.end();
//   }
// })().catch(console.error);

