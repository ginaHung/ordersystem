exports.ReturnFunctionSuccess = (data) => {
  const result = {};
  result.success = true;
  result.data = data;
  return result;
};

exports.ReturnFunctionFail = (err) => {
  const result = {};
  result.success = false;
  result.error = err;
  return result;
};
