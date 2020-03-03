// add code to read and set any environment variables with the dotenv package
console.log("this is loaded");

require("dotenv").config();
var request = require("request");

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

//Spotify
var Spotify = require("node-spotify-api");
var Song = "";

// Load the fs package to read and write
var fs = require("fs");

//process argv variables
//function
var theFunction = process.argv[2];
//search
var nodeArgs = process.argv;
var searchObj = "";

// * `concert-this` * `spotify-this-song` * `movie-this` * `do-what-it-says`
if (theFunction === "spotify-this-song") {
    spotify();
}

if (theFunction === "concert-this") {
    bands();
}

if (theFunction === "movie-this") {
    movie();
}

if (theFunction === "do-what-it-says") {
    fs.readFile("random.text", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var data = data.split(",");

        if (data[0] === "spotify-this-song") {
            process.argv[3] = data[1];
            spotify();
        }
    });
}

//Spotify
function spotify() {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < node.length) {
            Song = Song + "+" + nodeArgs[i];
        }else {
            Song += nodeArgs[i];
        }
    }
    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (!process.argv[3]) {
        Song = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search(
        {
            type: "track",
            query: Song,
            limit: 5
        },
        function(error, data) {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Song Info");
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name)
            console.log("Preview link: " + data.tracks.items[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);

        }
    )

}

//Bands in town
function bands() {
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            searchObj = searchObj = "+" + nodeArgs[i];
        } else {
            searchObj += nodeArgs[i];
        }
    }    
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchObj + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var concertData = JSON.parse(body);
        // venue location date
            for(i = 0; i < concertData.length; i++) {
                console.log("CONCERT INFO")
                console.log("Venue: " + concertData[i].venue.name);
                console.log("City: " + concertData[i].venue.city +
                 ", " + concertData[i].venue.country);
                 console.log("Date: " + SVGAnimateMotionElement
                 (concertData[i].datetime).format("MM/DD/YY"));

                 //if no events
                console.log(searchObj + " had no upcoming events.")
            }

        }
    });
}

//OMDB

function movie() {
var nodeArgs = process.argv;
var theMovie = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      theMovie = theMovie + "+" + nodeArgs[i];
    } else {
      theMovie += nodeArgs[i];
    }
  }
// if no movie typed in
  if (!process.argv[3]) {
      theMovie = "Mr. Nobody";
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + theMovie + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200) {
        var movieData = JSON.parse(body);
// title year rating rotten tomatoes country language plot actors
        console.log("MOVIE INFO")
        console.log("Title: " + movieData.Title);
        console.log("Released In: " + movieData.Year);
        console.log("IMDB rating: " + movieData.imdbRating);
        console.log("Rotten Tomatoes rating: " + movieData.Ratings[1].Value);
        console.log("Country produced in: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
    }
  });
}


//Bands in town
// https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp

//OMDB
// http://www.omdbapi.com/?t=" + theMovie + "&y=&plot=short&apikey=trilogy