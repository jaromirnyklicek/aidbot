var DateTime;
DateTime = function DateTime(datetime) {
  if (datetime === undefined) {
    this.isUTC = false;
  } else {
    this.isUTC = true;
  }

  this.setDateTime(datetime);
}

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

DateTime.prototype.getDateObject = function () {
  return this.dateObject;
}

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

DateTime.prototype.zeroFill = function(number, width)
{
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ""; // always return a string
}

module.exports = DateTime;
