//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
var rootUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

//template string
module.exports = function(latitude, longitude) {
  var url = `${rootUrl}${latitude},${longitude}&key=AIzaSyDyxgYqThVBztGnurQnCE_oj0vsCx6_FPY`;
  return fetch(url)
    .then(function(response){
  	  return response.json();
  	})
  	.then(function(json){
      var city = json.results[0].address_components[2].long_name.split(' ')[0]
  		return {
  		  city: city,
  		  state: json.results[0].address_components[4].short_name,
        country: json.results[0].address_components[5].short_name,
  		}
  	});
}
//http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0
//api.openweathermap.org/date/2.5/weather?&lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=37.13283999999998&lon=-95.78557999999998&appid=93e87bf97d422de142f8fa8d0771e5a6
//http://api.openweathermap.org/date/2.5/weather?lat=35&lon=139&appid=2de143494c0b295cca9337e1e96b00e0