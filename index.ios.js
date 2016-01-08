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
} = React;

var Api = require('./src/api');
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
      tempF: '',
      tempC: '',
      description: '',
      aqi: '',
      pm2_5: '',
      quality: '',
      primary_pollutant: '',
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
        <Text style={styles.text}>{this.state.tempF}
        </Text>
        <Text style={styles.text}>{this.state.description}
        </Text>
        <Text style={styles.text}>{this.state.aqi}
        </Text>
        <Text style={styles.text}>{this.state.pm2_5}
        </Text>
        <Text style={styles.text}>{this.state.quality}
        </Text>
        <Text style={styles.text}>{this.state.primary_polution}
        </Text>
      </View>
    </View>
  },
  onRegionChangeComplete: function(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude,
      },
    });
    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      });
    Mapapi(region.latitude, region.longitude)
      .then((city) => {
        this.setState(city)
      Airapi(this.state.city)
        .then((info) => {
          this.setState(info);
        })
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
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Weather', () => Weather);

//93e87bf97d422de142f8fa8d0771e5a6
