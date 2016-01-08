var rootUrl = 'api.openweathermap.org/data/2.5/weather?';
//api.openweathermap.org/data/2.5/weather?q={city name}

var kelvinToF = function(kelvin) {
	return Math.round((kelvin-273.15)*1.8+32)+' ˚F'

};

var kelvinToC = function(kelvin) {
	return Math.round(kelvin-273.15) + ' ˚C'
};
//template string
module.exports = function(latitude, longitude) {
  var url = `${rootUrl}lat=${latitude}&lon=${longitude}&APPID=3db9d162a42fd1a53941c17d5c159d46`;
  return fetch(url)
    .then(function(response){
      console.log(response)
  	  return response.json();
  	})
  	.then(function(json){
  		return {
  		  city: json.sys.name,
  		  tempF: kelvinToF(json.main.temp),
  		  tempC: kelvinToC(json.main.temp),
  		  description: _.capitalize(json.weather[0].description)
  		}
  	});
}
//http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0
//api.openweathermap.org/date/2.5/weather?&lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0