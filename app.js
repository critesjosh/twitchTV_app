var currentlyStreaming = false;
var streamURL = '';
var regularStreamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var ProfilePic;
var displayName;

var getUserInfo = function(){
  regularStreamers.forEach(function(user){
    $.ajax( "https://api.twitch.tv/kraken/users/" + user + "?callback=foo", {
      dataType: 'jsonp'
      }).done(function(data){
      console.log(data);
      displayName = data.display_name;
      profilePic = data.logo;
      $('.container-fluid').append('<div class="row"><div class="info ' + user + ' col-sm-8 col-sm-offset-2"><img src=' + profilePic + '><p>' + displayName + '</p></div></div>');

      $.ajax( "https://api.twitch.tv/kraken/streams/" + user, {
        dataType: 'jsonp'
      }).done(function(data){
        console.log(data);
        if (data.stream) {
          streamURL = data.stream.channel.url;
          var channel = data.stream.game;
          $('.' + user).append('<p col-sm-2 >Online</p>');
          $('.' + user).append('<a href=' + streamURL + '>Watch '+ channel + '</a>');
        } else {
          $('.' + user).toggleClass('offline');
          $('.' + user).append('<p>Offline</p>');
        }
      });

    });
  });
};

$(document).ready(function(){
  getUserInfo();
});
