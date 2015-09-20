/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SearchPage = require('./ios_js/SearchPage');

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
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}
      />
    );
  }
}

React.AppRegistry.registerComponent('PropertyFinder', () => PropertyFinder);
