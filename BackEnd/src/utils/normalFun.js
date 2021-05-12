const config = require('config');
const jwt = require('jsonwebtoken');

exports.signJWTtoken = async (emplid) => {
  try {
    // const userRole = await getRole(emplid);
    // logger.debug(userRole);
    // const userInfo = await getUserInfoByEmplid(emplid);
    // const found = userInfo.deptid.match(new RegExp('^1|^JD', 'g'));
    // if (!found) { throw new Error('Permission denied'); }

    // const realToken = jwt.sign({
    //   emplId: userInfo.emplid,
    //   displayName: `${userInfo.nameA}/${userInfo.site}/Wistron`,
    //   deptId: userInfo.deptid,
    //   mail: userInfo.emailAddressA,
    //   chineseName: userInfo.name,
    //   functionTeam: userRole.functionTeam,
    //   tmsRole: userRole.tmsRole,
    // }, config.JWT_SECRET);

    const realToken = JSON.stringify({
      emplId: '10910305',
      displayName: 'Gina',
      loginsuccess: true,
    });

    return realToken;
  } catch (error) {
    console.log(error);
  }
};
