require('./main.scss');

var Rx = require('rx');
require('rx-dom');
var $ = require('jquery');

var Rxhr = Rx.DOM.ajax({
  responseType: 'json',
  url: 'https://stream.twitter.com/1.1/statuses/sample.json',
  headers: {
    Authorization: [
      'OAuth oauth_consumer_key="XqLCEr44ah5fPOszDC7eNjo6X"',
      'oauth_nonce="c1a28604634695352dbaa691ab937b61"',
      'oauth_signature="xTp2ZC40j%2BT%2FuIWPCwSeS65pyPw%3D"',
      'oauth_signature_method="HMAC-SHA1"',
      'oauth_timestamp="1458160860"',
      'oauth_version="1.0"'
    ].join(', ')
  }
});


var subscription; 
subscription = Rxhr.subscribe(
  function (data) {
    data.response.forEach(function (twt) {
      console.log(twt);
    });
  },
  function (err) {
    console.log(err);
    useTestData();
  }
);


function useTestData(){
    var p = Promise.resolve(window.testData);
    subscription = Rx.Observable.fromPromise(p).subscribe(
        function (data) {
            data.response.forEach(function (twt) {
                console.log(twt);
            });
        }
    );    
}

