import 'react-native-gesture-handler';
import React from 'react';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';



import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const Users = [
  { id: "1", uri: require('C:\Users\matti\OneDrive\Skrivebord\soft-ui-pro-react-native-main\src\assets\images\card2@3x.png') },
  { id: "2", uri: require('./src/assets/images/card1@2x.png') },
  { id: "3", uri: require('./src/assets/images/card1@2x.png') },
  { id: "4", uri: require('./src/assets/images/card1@2x.png') },
  { id: "5", uri: require('./src/assets/images/card1@2x.png') },
]

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }
  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

      }
    })
  }

  renderUsers = () => {

    return Users.map((item, i) => {

      return (
        <Animated.View
          {...this.PanResponder.panHandlers}
          key={item.id} style={[{ transform: this.position.getTranslateTransform() }, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

          <Image
            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
            source={item.uri} />

        </Animated.View>
      )
    }).reverse()
  }

  render() {
    return (
      <DataProvider>
      <AppNavigation />
   
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>

        </View>


      </View>
      </DataProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*export default function App() {
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider>
  );
}*/