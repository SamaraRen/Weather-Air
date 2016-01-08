var rootUrl = 'http://www.pm25.in/api/querys/pm2_5.json?city=';
//beijing&token=5j1znBVAsnSf5xQyNQyq
//template string
module.exports = function(city) {
  var url = `${rootUrl}${city}&token=5j1znBVAsnSf5xQyNQyq`;
  return fetch(url)
    .then(function(response){
  	  return response.json();
  	})
  	.then(function(json){
  		return {
        aqi: json[0].aqi,
        pm2_5: json[0].pm2_5,
        quality: json[0].quality,
        primary_pollutant: json[0].primary_pollutant,
  		}
  	});
}
//http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0
//api.openweathermap.org/date/2.5/weather?&lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0