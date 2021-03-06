// 跑完會做的事情
module.exports = async (ctx, next) => {
  console.log('into middleware');
  ctx.error = ({
    data, msg, status, error,
  }) => {
    console.log('ctx.error');
    ctx.status = status || 400;
    ctx.body = {
      code: -200, msg, data, error,
    };
  };
  ctx.success = ({ data, msg }) => {
    console.log('ctx.success');
    console.log(data);
    console.log(msg);
    ctx.status = 200;
    ctx.body = { code: 200, msg, data };
  };
  await next();
};
