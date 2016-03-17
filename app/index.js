require('./main.scss');

var Rx = require('rx');
require('rx-dom');
var $ = require('jquery');

var $adjective = $('#adjective'),
    $noun = $('#noun');

var adjectiveUp = Rx.Observable.fromEvent($adjective, 'keyup')
  .map(function (e) {
    return e.target.value;
  })
  .filter(function (text) {
    return text.length > 2;
  })
  .debounce(750)
  .distinctUntilChanged();

var nounUp = Rx.Observable.fromEvent($noun, 'keyup')
  .map(function (e) {
    return e.target.value;
  })
  .filter(function (text) {
    return text.length > 2;
  })
  .debounce(750)
  .distinctUntilChanged();

var comboUp = 
  Rx.Observable.combineLatest(
    adjectiveUp,
    nounUp
  );


comboUp.subscribe(function(x) { console.log(x); });



// var subscription; 
// subscription = Rxhr.subscribe(
//   function (data) {
//     data.response.forEach(function (twt) {
//       console.log(twt);
//     });
//   },
//   function (err) {
//     console.log(err);
//     useTestData();
//   }
// );


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

