/**
 * Time
 *
 * @description :: Just Time 
 *
 */
 
// Generates a token from supplied payload
module.exports = {
  /**
   * Get a string like as 'Y-m-f' or sort of
   * @param  string format
   */
  getCurrentTime: function(format) {
    if (!format) {
      throw new Error('Invalid argument');
    }
    var result = '',
        currentTime = new Date();
        defaultDelimeter = '-';
    for (var i = 0, len = format.length; i < len; i++) {
      var currentChar = format[i];
      switch (currentChar.toLowerCase()) {
        case 'y':
          result += currentTime.getFullYear();
          break;
        case 'm':
          result += currentTime.getMonth() + 1;
          break;
        case 'd':
          result += currentTime.getDate();
          break;
        case 'h':
          result += currentTime.getHours();
          break;
        case 'i':
          result += currentTime.getMinutes();
          break;
        case 's':
          result += currentTime.getSeconds();
          break;
        default:
            result += '';
          break;
      }

      if (-1 != ['/', ':', '-', '.', ',', ' '].indexOf(currentChar)) {
        result += currentChar;
      }
    }
    return result;
  }
};