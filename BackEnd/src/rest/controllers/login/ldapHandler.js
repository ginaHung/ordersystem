const ldap = require('ldapjs');
const returnFormat = require('../../../utils/makeReturnFunctionResult');

// const ldapUrl = 'ldaps://twtpedc1.whq.Wistron';
// const ldapUrl = 'ldaps://zsnhudc1.wzs.wistron';
const ldapUrl = 'ldaps://cnzhsdc2.wzs.wistron';

let client = null;

async function login(usermail, userPassword) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        client.bind(usermail, userPassword, (err, res) => {
          if (err) {
            console.log(err.message);
            resolve(returnFormat.ReturnFunctionFail(err.message));
          } else {
            console.log('login sucess');
            resolve(returnFormat.ReturnFunctionSuccess(res));
          }
        });
      } catch (err) {
        resolve(returnFormat.ReturnFunctionFail(err.message));
      }
    })();
  });
};


async function logout() {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        client.unbind((error) => {
          if (error) {
            console.log(error.message);
            reject(error);
          } else {
            console.log('logout success');
            resolve();
          }
        });
      } catch (err) {
        resolve(returnFormat.ReturnFunctionFail(err.message));
      }
    })();
  });
}

exports.auth = async (usermail, userPassword) => {
  try {
    client = ldap.createClient({
      url: ldapUrl,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    });
    const result = await login(usermail, userPassword);
    await logout();
    if (result.success === true) {
      return returnFormat.ReturnFunctionSuccess(result.data);
    }
    return returnFormat.ReturnFunctionFail(result.error);
  } catch (error) {
    return returnFormat.ReturnFunctionFail(error.name);
  }
};


// var ldapAuth = {
//   login: function (usermail, userPassword) {
//     return new Promise(function (resolve, reject) {
//       client.bind(usermail, userPassword, function (error, res) {
//         console.log(res);
//         if (error) {
//           console.log(error.message);
//           reject(error);
//         } else {
//           let base = 'DC=wistron';
//           let options = {
//             scope: 'sub',
//             attrs: 'memberOf',
//             filter: '(sAMAccountName=' + ctx.args.credentials.username + ')'
//           };
//           client.search(base, opts, function (err, res) {
//             res.on('searchEntry', function (entry) {
//               console.log('entry: ' + JSON.stringify(entry.object));
//               let userInfo = {
//                 userEnName: entry.object.cn,
//                 userCnName: entry.object.sn,
//                 email: entry.object.mail,
//                 site: ctx.args.credentials.domain,
//                 plant: ctx.args.credentials.plant
//               };
//               resolve(userInfo);
//             });
//             // res.on('searchReference', function (referral) {
//             //   console.log('referral: ' + referral.uris.join());
//             //   resolve();
//             // });
//             res.on('error', function (err) {
//               console.error('error: ' + err.message);
//               //error: 000004DC: LdapErr: DSID-0C0907C2, comment: In order to perform this operation a successful bind must be completed on the connection., data 0, v2580
//               if (err.message.includes("a successful bind")) {
//                 reject(err);
//               }
//               else {
//                 resolve();
//               }

//             });
//             res.on('end', function (result) {
//               console.log('status: ' + result.status);
//               resolve();
//             });
//           });
//         }
//       });
//     });
//   },