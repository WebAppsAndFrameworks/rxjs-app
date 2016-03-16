var Rx = require('rx');
require('rx-dom');
var $ = require('jquery');

Rx.DOM.ajax({
  responseType: 'json',
  url: 'https://stream.twitter.com/1.1/statuses/sample.json',
  headers: {
    // Authorization: [
    //   'OAuth oauth_consumer_key="XqLCEr44ah5fPOszDC7eNjo6X"',
    //   'oauth_nonce="c1a28604634695352dbaa691ab937b61"',
    //   'oauth_signature="xTp2ZC40j%2BT%2FuIWPCwSeS65pyPw%3D"',
    //   'oauth_signature_method="HMAC-SHA1"',
    //   'oauth_timestamp="1458160860"',
    //   'oauth_version="1.0"'
    // ].join(', ')
     Authorization: 'OAuth oauth_consumer_key="XqLCEr44ah5fPOszDC7eNjo6X", oauth_nonce="5d1a724023581e22401408af138b81bb", oauth_signature="w2uZgEOD%2FJfzFUcHVED7KOYhMQQ%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1458162001", oauth_token="52961768-EI4J2NdSC5STCBbwf38qCZka03VcPGtfXACBG176H", oauth_version="1.0"'
  }
})
.subscribe(
  function (data) {
    data.response.forEach(function (twt) {
      console.log(twt);
    });
  },
  function (err) {
    console.log(err);
  }
);

