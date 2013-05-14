var AidbotWindow;
AidbotWindow = function ()
{
  this.cookieName = 'aidbot-window';
  this.frameWrapperId = 'aidbot-frame';
}

AidbotWindow.prototype.getCookie = function (name)
{
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + name + "=");
  if (c_start == -1) {
    c_start = c_value.indexOf(name + "=");
  }
  if (c_start == -1) {
    c_value = null;
  }
  else {
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
      c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

AidbotWindow.prototype.setCookie = function (name, value, expiration)
{
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiration);
  var c_value = escape(value) + ((expiration == null) ? "" : "; expires=" + exdate.toString());
  document.cookie = name + "=" + c_value;
}

AidbotWindow.prototype.toggle = function()
{
  var show = this.isFrameVisible();
  show = (show + 1) % 2;
  this.setCookie(this.cookieName, show, 7);
  this.showFrame();
}

AidbotWindow.prototype.isFrameVisible = function()
{
  var show = this.getCookie(this.cookieName);
  if(!show) {
    show = 0;
  }

  return show;
}

AidbotWindow.prototype.showFrame = function()
{
  var show = this.isFrameVisible();

  var frame = document.getElementById(this.frameWrapperId);

  if(show == 0) {
    frame.innerHTML = '';
  } else {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:8080/window/';
    iframe.frameborder = 0;
    frame.appendChild(iframe);
  }
}

var aidbot = new AidbotWindow();
aidbot.showFrame();
