// add code to read and set any environment variables with the dotenv package
console.log("this is loaded")
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
var search = "";

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
// https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp

//OMDB
// http://www.omdbapi.com/?t=" + theMovie + "&y=&plot=short&apikey=trilogy