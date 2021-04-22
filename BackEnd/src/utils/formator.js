module.exports = class ResFormator {
  constructor(result, count) {
    this.SUCCESS = false;
    this.RESULT = {};
    this.ErrorCode = false;
    if (result === undefined) {
      this.SUCCESS = true;
      this.RESULT = {};
    } else if (result.name === 'Error') {
      this.ErrorCode = result.message;
    } else {
      this.SUCCESS = true;
      this.RESULT = result;
      if (count !== undefined) {
        this.TotalCount = count;
      }
    }
  }

  // set success(v) {
  //   if (typeof (v) === 'boolean') {
  //     this.SUCCESS = v;
  //   } else {
  //     throw new TypeError('success is not boolean type');
  //   }
  // }

  // set result(v) {
  //   if (typeof (v) === 'object') {
  //     this.RESULT = v;
  //   } else {
  //     throw new TypeError('result is not object type');
  //   }
  // }

  // set errorCode(v) {
  //   if (typeof (v) !== 'string') {
  //     throw new TypeError('ERRORCODE is not string type');
  //   } else {
  //     this.ErrorCode = v;
  //   }
  // }

  get fullResponse() {
    if (this.SUCCESS === true && !this.RESULT) throw new Error('result cannot be blank if no error occur');
    if (this.TotalCount !== undefined) {
      return {
        success: this.SUCCESS,
        result: this.RESULT,
        totalCount: this.TotalCount,
        errorCode: this.ErrorCode,
      };
    }
    return {
      success: this.SUCCESS,
      result: this.RESULT,
      errorCode: this.ErrorCode,
    };
  }
};
