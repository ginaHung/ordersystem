const oracledb = require('oracledb');
const config = require('config');
const returnFormat = require('../../utils/makeReturnFunctionResult');

oracledb.fetchAsString = [oracledb.CLOB];

let oracleUser = 'C##ANTATRY';
if (process.env.oracleUser === undefined) {
  console.log(config.oracleUser);
  oracleUser = config.oracleUser;
} else {
  oracleUser = process.env.oracleUser;
}

let oraclePassword = 'antatry';
if (process.env.oraclePassword === undefined) {
  console.log(config.oraclePassword);
  oraclePassword = config.oraclePassword;
} else {
  oraclePassword = process.env.oraclePassword;
}

let oraclePrivilege = 'SYSDBA';
if (process.env.privilege === undefined) {
  oraclePrivilege = config.privilege;
} else {
  oraclePrivilege = process.env.privilege;
}


let oracleConnectString = '';
if (process.env.oracleHost === undefined) {
  console.log(config.oracleHost);
  oracleConnectString = `${config.oracleHost}:${config.oraclePort}/${config.oracleDB}`;
} else {
  oracleConnectString = `${process.env.oracleHost}:${process.env.oraclePort}/${process.env.oracleDB}`;
}

exports.query = async (sqlcommand) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: oracleUser,
      password: oraclePassword,
      connectString: oracleConnectString,
      // privilege: oracledb.SYSDBA,
      privilege: oracledb[oraclePrivilege],
      // privilege: oracledb.SYSDBA
    });
    // connection = await oracledb.getConnection({
    //   user: 'SBG2018',
    //   password: 'SBG2018',
    //   connectString: '//TPEHRPS.WISTRON.COM:1688/PROD'
    // });
    // connection = await oracledb.getConnection({
    //   user: 'C##ANTATRY',
    //   password: 'antatry',
    //   connectString: '//10.31.50.66:1521/XEPDB2'
    // });
    const tmp = await connection.execute(sqlcommand, {}, { outFormat: oracledb.OBJECT });
    return returnFormat.ReturnFunctionSuccess(tmp.rows);
  } catch (err) {
    console.error(err);
    return returnFormat.ReturnFunctionFail(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
