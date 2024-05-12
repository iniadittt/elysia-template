function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/;';
}

function getCookie() {
  var name = 'token=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookies = decodedCookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

function deleteCookie(name) {
  if (getCookie(name) !== null) {
    var expires = ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = name + '=' + expires + ';path=/;';
  }
}
