function makeAjaxCall(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var responseText = xmlhttp.responseText;
        console.log(responseText);
        callback(responseText);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  function sendMessageToPhonegap(message) {
    //alert("sendMessageToPhonegap:" + message);
    window.parent.postMessage(message, "*");
  }

  function testFbAPI(access_token) {
    makeAjaxCall(
      "https://graph.facebook.com/v2.2/me?format=json&method=get&pretty=0&suppress_http_code=1&access_token="
        + access_token,
      function(responseText) {
        var response = JSON.parse(responseText);
        alert('Successful login for: ' + response.name);
      }
    );
  }

  window.addEventListener("message", function (event) {
    var message = event.data;
    var source = event.source;
    if (source === window.parent) {
      //alert("platform got message:" + JSON.stringify(message));
      //if (message.token) {
      //  testFbAPI(message.token);
      //}
    }
  }, false);

  makeAjaxCall("phonegapIframe_phonegapCode.js",
    function(responseText) {
      //alert('Loaded phonegapIframe_phonegapCode.js: ' + responseText);
      sendMessageToPhonegap(responseText);
    }
  );