/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchPage = require('./android_js/SearchPage');
var SearchResults = require('./android_js/SearchResults');
var PropertyView = require('./android_js/PropertyView');

var {
  Text,
  TouchableOpacity
} = React;

var styles = React.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
};

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <Text>
          Previous
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}>
        <Text>
          Next
        </Text>
      </TouchableOpacity>
    );
  },
  Title: function(route, navigator, index, navState) {
    return (
      <Text>
        {route.title} [{index}]
      </Text>
    );
  },

};

class PropertyFinder extends React.Component {
  render() {
    return (
      <React.Navigator
        style={styles.container}
        initialRoute={{
          title: 'Finder',
          index: 0,
        }}
        renderScene={(route, navigator) => {
          switch (route.title) {
            case 'Finder':
              return <SearchPage navigator={navigator}></SearchPage>
              break;
            case 'Results':
              return <SearchResults navigator={navigator} listings={route.listings}></SearchResults>;
              break;
            case 'Property':
              return <PropertyView property={route.property}></PropertyView>;
              break;
          }
        }
        }
        navigationBar={
          <React.Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
          />
        }
      />
    );
  }
}

React.AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
