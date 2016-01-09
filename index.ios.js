/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  TouchableHighlight,
} = React;

var Api = require('./src/api');
var ApiChina = require('./src/apichina');
var Airapi = require('./src/airapi');
var Mapapi = require('./src/mapapi');
//{"aqi":50,"area":"广州","pm2_5":33,"pm2_5_24h":34,"position_name":"广雅中学","primary_pollutant":null,"quality":"优","station_code":"1345A","time_point":"2016-01-08T06:00:00Z"},
var Weather = React.createClass({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0,
      },
      city: '',
      state: '',
      country: '',
      tempF: '',
      tempC: '',
      description: '',
      aqi: '',
      pm2_5: '',
      quality: '',
      primary_pollutant: '',
      f: true,
    };
  },
  render: function() {
    return <View style={styles.container}>
      <MapView
        annotations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
        style={styles.map}>
      </MapView>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{this.state.city}
        </Text>
        <View style={styles.temp}>
            {this.fOrCText()}
          <Text style={styles.text}>    {this.state.description}
          </Text>
        </View>
        {this.airText()}
        <View style={styles.buttonWrapper}>
          {this.fOrCButton()}
        </View>
      </View>
    </View>
  },
  airText: function() {
    if (this.state.country=='US') {
      return <View>
          <View style={styles.air}>
            <Text style={styles.airtext}>空气质量指数: {this.state.aqi}
            </Text>
            <Text style={styles.airtext}>   PM2.5: {this.state.pm2_5}
            </Text>
          </View>
          <View>
            <Text style={styles.airtext}>空气质量: {this.state.quality}
            </Text>
            <Text style={styles.airtext}>   主要污染物: {this.state.primary_pollutant}
            </Text>
          </View>
        </View>
    }
  },
  fOrC: function() {
    if (this.state.f == true) {
      this.setState({f: false});
    }
    else {
      this.setState({f: true});
    }
  },
  fOrCButton: function() {
    return <TouchableHighlight
    underlayColor="gray"
    onPress={this.fOrC}
    style={styles.button}>
        <Text style={styles.t}>
          {this.state.f ? '˚F' : '˚C'}
        </Text>
      </TouchableHighlight>
  },
  fOrCText: function() {
    return <Text style={styles.text}>
          {this.state.f ? this.state.tempF+"˚F" : this.state.tempC+"˚C"}
        </Text>
  },
  onRegionChangeComplete: function(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude,
      },
    });
    Mapapi(region.latitude, region.longitude)
      .then((city) => {
        console.log(city)
        this.setState(city)
        if (this.state.country=='US') {
          console.log(this.state.city)
          Api(this.state.city, this.state.state)
            .then((data) => {
              this.setState(data);
            });
        }
        else if (this.state.country!='US') {
          console.log(this.state.city)
          Api(this.state.city, this.state.state)
            .then((data) => {
              this.setState(data);
            });
        }
      })
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 2,
    marginTop: 30,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  temp: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  t: {
    color: 'white',
    fontWeight: '600',
    fontSize: 25
  },
  button: {
    backgroundColor: '002058',
    borderWidth: 2,
    borderColor: 'E87722',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {//green
    flex: 5, // takes up 5/8ths of the available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  air: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  airtext: {
    fontSize: 15,
  },
  temp: {
    flexDirection: 'row',
  }
});

AppRegistry.registerComponent('Weather', () => Weather);

//93e87bf97d422de142f8fa8d0771e5a6

//<Text style={styles.text}>{this.state.aqi}
//</Text>
//<Text style={styles.text}>{this.state.pm2_5}
//</Text>
//<Text style={styles.text}>{this.state.quality}
//</Text>
//<Text style={styles.text}>{this.state.primary_polution}
//</Text>
