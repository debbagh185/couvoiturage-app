import React, { Component } from "react";
import { View, Animated } from "react-native";
import dim from "../constants/Layout";
import { MapView } from "expo";
import demo from '../constants/Demo';
import MapViewDirection from "react-native-maps-directions";
import { Button, Text } from "native-base";
import { Actions } from "react-native-router-flux";
class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapType: "standard",
      initRegion: {
        latitude: 31.5097587,
        longitude: -9.7761707,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011
      },
      region: {
        latitude: 31.5097587,
        longitude: -9.7761707,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011
      },
      circuit: 0,
      currentMarkers: 1,
      showOptions: false
    };
    this.changeMapType = this.changeMapType.bind(this);
    this.getMyPosition = this.getMyPosition.bind(this);
    this.changeViewToInitStates = this.changeViewToInitStates.bind(this);
    this.changeViewToUserLocation = this.changeViewToUserLocation.bind(this);
    this.changeTarget = this.changeTarget.bind(this);
    this.animationValue = new Animated.Value(0)
  }
  componentDidMount() {
    this.getMyPosition();
  }
  getMyPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }
  changeMapType() {
    switch (this.state.mapType) {
      case "standard":
        this.setState({ mapType: "satellite" });
        break;
      case "satellite":
        this.setState({ mapType: "hybrid" });
        break;
      case "hybrid":
        this.setState({ mapType: "standard" });
        break;
    }
    this.setState({ showOptions:false});
  }
  changeViewToInitStates() {
    this.setState({
      region: this.state.initRegion,
      showOptions:false
    });
  }
  changeViewToUserLocation() {
    this.setState({
      region: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.011,
        longitudeDelta: 0.011
      },
      showOptions:false
    });
  }
  changeTarget() {
    if (
      this.state.currentMarkers <
      demo.circuits[this.state.circuit].markers.length - 1
    )
      this.setState({ currentMarkers: this.state.currentMarkers + 1 ,showOptions:false});
    else this.setState({ currentMarkers: 0 ,showOptions:false});
  }
  render() {
    return (
      <View style={{ height: dim.window.height }}>
        <Button
          full
          dark
          onPress={() =>
            this.setState({ showOptions: !this.state.showOptions })
          }
        >
          <Text>Options</Text>
        </Button>
        {this.state.showOptions && (
          <View>
            <Button full light onPress={this.changeMapType}>
              <Text>Change view</Text>
            </Button>
            <Button full light onPress={this.changeViewToInitStates}>
              <Text>Back to the region</Text>
            </Button>
            <Button full light onPress={this.changeViewToUserLocation}>
              <Text>My Location</Text>
            </Button>
            <Button onPress={this.changeTarget} full light>
              <Text>Next Location</Text>
            </Button>
          </View>
        )}
        <View>
          <MapView
            showsUserLocation={true}
            followsUserLocation={true}
            mapType={this.state.mapType}
            style={{ alignSelf: "stretch", height: dim.window.height - 32 }}
            initialRegion={this.state.initRegion}
            region={this.state.region}
          >
            {demo.circuits[this.state.circuit].markers.map(el => (
              <MapView.Marker
                key={el.id}
                coordinate={el.coordinate}
                title={el.title}
                description={el.description}
                flat={true}
                onCalloutPress={() => {
                  Actions.repport();
                }}
              />
            ))}
            <MapView.Polyline
              coordinates={demo.circuits[this.state.circuit].cordinantes}
              strokeColor="#2980b9" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                "#7F0000",
                "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                "#B24112",
                "#E5845C",
                "#238C23",
                "#7F0000"
              ]}
              strokeWidth={3}
            />
            {this.state.latitude && this.state.longitude && (
              <MapViewDirection
                origin={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                destination={
                  demo.circuits[this.state.circuit].markers[
                    this.state.currentMarkers
                  ].coordinate
                }
                apikey={"AIzaSyAnkHzyv-dqcYyC3rRO1fly8Ae5b6jAeMY"}
                strokeWidth={3}
                strokeColor="hotpink"
                mode="walking"
                optimizeWaypoints
              />
            )}
          </MapView>
        </View>
      </View>
    );
  }
}

export default MapScreen;
