//imports
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");
var inquirer = require("inquirer");
var fs = require("fs");

//keys
var tweetKey = keys.twitterKeys.consumer_key.trim();
var tweetSecret = keys.twitterKeys.consumer_secret.trim();
var tweetToken = keys.twitterKeys.access_token_key.trim();
var tweetTokenSecret = keys.twitterKeys.access_token_secret.trim();
var spotifyId = keys.spotifyKeys.clientId.trim();
var spotifySecret = keys.spotifyKeys.secret.trim();

//create new spotify object
var spotify = new Spotify({id: spotifyId, secret: spotifySecret});

//create new twitter object
var twitter = new Twitter({
  consumer_key: tweetKey,
  consumer_secret: tweetSecret,
  access_token_key: tweetToken,
  access_token_secret: tweetTokenSecret
});

var command = process.argv[2];
liri(command);

function tweet()
{
	twitter.get('statuses/user_timeline', { screen_name: 'mothra424', count: 1 }, function(error, tweets, response) 
	{
		for (var i = 0; i < tweets.length; i++) 
		{
			console.log(tweets[i].text + " created at " + tweets[i].created_at);
		}
   		
	});
}

function spotifySearch(ranText)
{
	if(ranText)
	{
		spotify.search({ type: 'track', query: ranText, limit: 1}, function(err, data) 
			{
				console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
  				console.log("Album: " + data.tracks.items[0].album.name);
  				console.log("Song Name: " + data.tracks.items[0].name);
  				console.log("Preview: " + data.tracks.items[0].preview_url);
  				return;
			});
	}
	else
	{
	inquirer.prompt(
		[
			{
				type: "input",
				message: "type a song name",
				name: "song_name"
			}
		]).then(function(inqRes)
		{
			spotify.search({ type: 'track', query: inqRes.song_name, limit: 1}, function(err, data) 
			{
  				if (err) 
  				{
  					spotify.search({type: "track", query: "The Sign", limit: 1}, function(error, data2)
  					{
  						if(error)
  						{
  							console.log("an error has occured: " + err);
  							return;
  						}
  						console.log("Artist: " + data2.tracks.items[0].album.artists[0].name);
  						console.log("Album: " + data2.tracks.items[0].album.name);
  						console.log("Song Name: " + data2.tracks.items[0].name);
  						console.log("Preview: " + data2.tracks.items[0].preview_url);
  					});
  				}
  				console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
  				console.log("Album: " + data.tracks.items[0].album.name);
  				console.log("Song Name: " + data.tracks.items[0].name);
  				console.log("Preview: " + data.tracks.items[0].preview_url);
			});
		});
	}	
}

function omdb()
{
	var movieName = process.argv.slice(3).join("+");
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	request(queryUrl, function(error, response, body)
	{
		if(movieName === "")
		{
			movieName = "mr+nobody"
			console.log(movieName);
			request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece", function(error, response, body)
			{
				console.log(JSON.parse(body).Title);
				console.log(JSON.parse(body).Year);
				console.log(JSON.parse(body).imdbRating);
				console.log(JSON.parse(body).Actors);
			});
		}
  		else if (!error && response.statusCode === 200) 
  		{
  			console.log(JSON.parse(body).Title);
			console.log(JSON.parse(body).Year);
			console.log(JSON.parse(body).imdbRating);
			console.log(JSON.parse(body).Actors);
  		}
	});
}

function chooseRan()
{
	fs.readFile("random.txt", "utf8", function(err, data)
	{
		if(err)
		{
			return console.log(err);
		}
		var textArr = data.split(",");
		liri(textArr[0], textArr[1]);
	});
}

function liri(command, ranText)
{
	switch(command)
	{
		case "my-tweets":
			tweet();
			break;
		case "spotify-this-song":
			spotifySearch(ranText);
			break;
		case "movie-this":
			omdb();
			break;
		case "do-what-it-says":
			chooseRan();
			break;		
	}
}	

