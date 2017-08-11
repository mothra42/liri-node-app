var keys = require("./keys.js");

var tweetKey = keys.twitterKeys.consumer_key.trim();
var tweetSecret = keys.twitterKeys.consumer_secret.trim();
var tweetToken = keys.twitterKeys.access_token_key.trim();
var tweetTokenSecret = keys.twitterKeys.access_token_secret.trim();

console.log(tweetKey);
console.log(tweetSecret);
console.log(tweetToken);
console.log(tweetTokenSecret);

var command = process.argv[2];

function tweet()
{
	//twitter stuff
}

function spotify()
{
	//spotify stuff
}

function omdb()
{
	//omdb stuff
}

function chooseRan()
{
	//read random text here
}

switch(command)
{
	case "my-tweets":
		break;
	case "spotify-this-song":
		break;
	case "movie-this":
		break;
	case "do-what-it-says":
		break;		
}

