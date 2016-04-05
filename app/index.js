require('./main.scss');

var Rx = require('rx');
require('rx-dom');
var $ = require('jquery');
var videojs = require('video.js');

var GIPHY = {
  searchUri: 'http://api.giphy.com/v1/gifs/search?q=',
  apiKey: 'dc6zaTOxFJmzC'
};

var $adjective = $('#adjective'),
    $noun = $('#noun');

var adjectiveUp = observableFromInput($adjective);
var nounUp = observableFromInput($noun);

var comboUp = Rx.Observable.combineLatest(
  adjectiveUp,
  nounUp
);

comboUp.subscribe(function(x) {
  Rx.DOM.ajax({
    url: GIPHY.searchUri + x.join('+') + '&api_key=' + GIPHY.apiKey,
    responseType: 'json'
  })
  .subscribe(
    function giphySuccess(results) {
      var view = $('#view').html('');

      results.response.data.forEach(function(item) {
        var video = $('<video/>').appendTo(view);

        videojs(video[0], {
            'preload': 'auto',
            'controls': true,
            'loop': true
          }, function() {
            var player = this;
            player.bigPlayButton.show();

            player.on('pause', function() {
              player.bigPlayButton.show();
            });

            player.on('play', function() {
              player.bigPlayButton.hide();
            });

            video[0]
              .parentNode
              .classList.add('vjs-default-skin', 'vjs-big-play-centered');

            player.src(item.images.fixed_width.mp4);
        });
      });
    },
    function giphyError(error) {
      console.log(error);
    });
});

function observableFromInput(inputElement){
  return Rx.Observable.fromEvent(inputElement, 'keyup')
      .map(function (e) {
        return e.target.value;
      })
      .filter(function (text) {
        return text.length > 2;
      })
      .debounce(750);
}

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

// function useTestData(){
//     var p = Promise.resolve(window.testData);
//     subscription = Rx.Observable.fromPromise(p).subscribe(
//         function (data) {
//             data.response.forEach(function (twt) {
//                 console.log(twt);
//             });
//         }
//     );
// }
