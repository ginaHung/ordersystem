const Pool = require('pg-pool');
const config = require('config');
const returnFormat = require('../../utils/makeReturnFunctionResult');

exports.query = async (sqlcommand) => {
  let connection = null;
  let pool = null;
  try {
    pool = new Pool({
      user: config.user, // env var: PGUSER
      database: config.database, // env var: PGDATABASE
      password: config.password, // env var: PGPASSWORD
      host: config.host, // Server hosting the postgres database
      port: config.port, // env var: PGPORT
      connectionTimeoutMillis: 120 * 1000,
      timezone: config.timezone, // 'Asia/Taipei',
    });
    connection = await pool.connect();
    const result = await connection.query(sqlcommand);
    return returnFormat.ReturnFunctionSuccess(result.rows);
  } catch (error) {
    console.error(error);
    return returnFormat.ReturnFunctionFail(error);
  } finally {
    if (connection) {
      try {
        connection.release();
        await pool.end();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

exports.queryReturnAllResult = async (sqlcommand) => {
  let connection = null;
  let pool = null;
  try {
    pool = new Pool({
      user: config.user, // env var: PGUSER
      database: config.database, // env var: PGDATABASE
      password: config.password, // env var: PGPASSWORD
      host: config.host, // Server hosting the postgres database
      port: config.port, // env var: PGPORT
      connectionTimeoutMillis: 20 * 1000,
    });
    connection = await pool.connect();
    const result = await connection.query(sqlcommand);
    return returnFormat.ReturnFunctionSuccess(result);
  } catch (error) {
    console.error(error);
    return returnFormat.ReturnFunctionFail(error);
  } finally {
    if (connection) {
      try {
        connection.release();
        await pool.end();
      } catch (error) {
        console.error(error);
      }
    }
  }
};


// const Postgres = (config) => {
//   const pool = new pg.Pool({
//     user: config.user, // env var: PGUSER
//     database: config.user, // env var: PGDATABASE
//     password: config.user, // env var: PGPASSWORD
//     host: config.user, // Server hosting the postgres database
//     port: config.user, // env var: PGPORT
//     schema: config.schema,
//   });

//   return {
//     Query: (sql, params) => {
//       try {
//         return new Promise((resolve, reject) => {
//           pg.defaults.parseInt8 = true
//           pool.connect(function (err, client, done) {
//             if (err) {
//               console.log(`error === ${err}`)
//               reject({ message: 'could not connect to postgres', code: errorCode.DB_CONNECT_ERROR })
//             }
//             if (client == null || typeof client.query != 'function') {
//               new Error('property query null')
//             } else {
//               client.query(sql, params, function (err, result) {
//                 done()
//                 if (err) {
//                   console.log(`error === ${err}`)
//                   reject({ message: 'error running query', code: errorCode.DB_QUERY_ERROR })
//                 }
//                 resolve(result)
//               })
//             }
//           })
//         })
//       } catch (e) {
//         console.log(`error === ${e}`)
//         throwApiError('DB_ERROR', errorCode.DB_ERROR)
//       }
//     },
//   }
// }

// export const batchQuery = function* (queryFunction, listPara, splitSize) {
//   const batchList = R.splitEvery(splitSize, listPara)
//   const result = { rows: [] }
//   for (let list of batchList) {
//     const tmp = yield queryFunction(list)
//     result.rows = result.rows.concat(tmp.rows)
//   }
//   return result
// }

// export default Postgres
