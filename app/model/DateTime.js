var DateTime;

/**
 * Simple wrapper around internal JavaScript Date object. Allows you to print date as a string in
 * ISO 8601 format.
 *
 * @param {String} datetime
 * @constructor
 */
DateTime = function DateTime(datetime) {
  if (datetime === undefined) {
    this.isUTC = false;
  } else {
    this.isUTC = true;
  }

  this.setDateTime(datetime);
}

/**
 * Parses given datetime string and cretes internal Date object.
 *
 * @param {String|Date|undefined} datetime if not defined sets current date and time
 */
DateTime.prototype.setDateTime = function (datetime) {
  var date;
  if (datetime instanceof String) {
    datetime = datetime.replace(' ', 'T');
    date = new Date(datetime);
  } else if (datetime instanceof Date) {
    date = datetime;
  } else {
    date = new Date();
  }

  this.dateObject = date;
}

/**
 * Returns internal Date object.
 *
 * @returns {Date}
 */
DateTime.prototype.getDateObject = function () {
  return this.dateObject;
}

/**
 * Returns internal datetime in ISO 8601 format.
 *
 * @returns {String}
 */
DateTime.prototype.toString = function () {
  var year = this.dateObject.getUTCFullYear()
    , month = this.dateObject.getUTCMonth()
    , day = this.dateObject.getUTCDate()
    , hour = this.dateObject.getUTCHours()
    , minute = this.dateObject.getUTCMinutes()
    , second = this.dateObject.getUTCSeconds();

  if(this.isUTC) {
    year = this.dateObject.getFullYear();
    month = this.dateObject.getMonth();
    day = this.dateObject.getDate();
    hour = this.dateObject.getHours();
    minute = this.dateObject.getMinutes();
    second = this.dateObject.getSeconds();
  }

  month++;

  var str = '';
  str += year;
  str += '-';
  str += this.zeroFill(month, 2);
  str += '-';
  str += this.zeroFill(day, 2);
  str += 'T';
  str += this.zeroFill(hour, 2);
  str += ':';
  str += this.zeroFill(minute, 2);
  str += ':';
  str += this.zeroFill(second, 2);

  return str;
}

/**
 * Pads given number with zeros from left.
 *
 * @private
 * @param number
 * @param width
 * @returns {string}
 */
DateTime.prototype.zeroFill = function(number, width)
{
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

module.exports = DateTime;
