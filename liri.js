require("dotenv").config();

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");
var keys = require("./keys");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var fs = require("fs");
var getArtistNames = function(artist){
  return artist.name;
}
var myTweets = function(){
  var client = new Twitter(keys.twitter);
  var params = {
    screen_name: "slunchiceto"
  }
  client.get("statuses/user_timeline", params, function(error, tweets, responses){
    if (!error){
      for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  })

};
var runThis = function(argOne, argTwo){
  pick(argOne, argTwo);
};

var pick = function(caseData, functionData){
  switch(caseData){
    case "myTweets":
    myTweets();
    break;
    case "spotify-this-song":
    spotifySong(functionData);
    break;
    case "getMeMovie":
    getMeMovie(functionData);
    break;
    case "doWhatItSays":
    doWhatItSays();
    break;
  }
}

var spotifySong = function(songName){
  spotify.search({
    type:"track",
    query: songName
  }, 
  function(err, data){
    if (err){
      console.log("error occured:" + err);
      return;
    }
    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++){
      console.log(i);
      console.log("artists: " + songs[i].artists.map(getArtistNames));
      console.log("songs name: " + songs[i].name);
      console.log("preview song: " + songs[i].preview_url);
      console.log("album: " + songs[i].album.name);
      console.log("________________________ ");
    }
  }

);

};

var doWhatItSays = function(){

};

var getMeMovie = function(){

}

runThis(process.argv[2], process.argv[3]);