const Joi = require("joi");
const { validateFormat } = require("../../../utils/validator");

exports.login = (value) => {
  const schema = Joi.object().keys({
    domain: Joi.string().optional(),
    // mail: Joi.string().email().required(),
    user: Joi.string().required(),
    pwd: Joi.string().required(),
    // test: Joi.string().optional()
  });
  const validator = schema.validate(value);
  // 用validateFormat驗證validator是否有問題, 有的話就組裝好錯誤訊息回傳
  const validateResult = validateFormat(validator);
  if (validateResult.error) {
    throw new Error(validateResult.errorKeys);
  }
};