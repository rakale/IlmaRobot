var request = require("request");
var Twit = require("twit");
const { apiLink } = require("./configs");
var configs = require("./configs");

var TwitterApi = new Twit(configs);
var currentTemp;
var minimumTemp;
var maximumTemp;
var weatherDescription;
var windSpeed;
var url = "http://api.openweathermap.org/data/2.5/weather?q=Tallinn&APPID=72c567c7141a3a3f528ae6ac678c5c59&units=metric"

  function GetData() {
      console.log(url)
    request({ url: url, json: true }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        currentTemp = body.main.temp;
        minimumTemp = body.main.temp_min;
        maximumTemp = body.main.temp_max;
        humidity = body.main.humidity;
        windSpeed = body.wind.speed;
        weatherDescription = body.weather[0].description;
        CleanData();
      } else {
        console.log("Error triggered inside of the GetData function.");
        console.log(error);
      }
    });
  }

  function CleanData() {
    currentTemp = currentTemp.toFixed(0);
    minimumTemp = minimumTemp.toFixed(0);
    maximumTemp = maximumTemp.toFixed(0);
    windSpeed = windSpeed.toFixed(0);
    Tweet();
  }

  function Tweet() {
    var weatherUpdate =
      "Currently " +
      configs.city +
      " is experiencing " +
      weatherDescription +
      " at " +
      currentTemp +
      "°C." +
      "\n" +
      "Daily forecast: min of " +
      minimumTemp +
      "°C " +
      "& a max of " +
      maximumTemp +
      "°C with " +
      humidity +
      "% Humidity" +
      " & " +
      windSpeed +
      "m/s Wind. \n#Tallinn";
    var tweet = {
      status: weatherUpdate,
    };
    TwitterApi.post("statuses/update", tweet, callback);
    function callback(error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Tweeted successfully: \n" + weatherUpdate);
      }
    }
  }

  setInterval(GetData, 1000 * 60 * 10);
  
