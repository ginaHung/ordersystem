// 驗證格式用, 重新組裝錯誤訊息
exports.validateFormat = (validateResult) => {
  if (validateResult.error) {
    const errorArray = validateResult.error.details;

    var errorKeys = "";

    errorArray.forEach(function(item, index, array) {
      errorKeys = errorKeys + item.message + ", ";
    });

    //刪除最後兩個字元
    errorKeys = errorKeys.substring(0, errorKeys.length - 2);

    return {
      error: true,
      errorKeys
    };
  }
  return {
    error: false
  };
};
