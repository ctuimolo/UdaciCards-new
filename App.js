import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Icon } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import QuizView from './components/QuizView'
import { setLocalNotification, clearLocalNotification } from './utils/helpers';

function Home (props) {
  return (
    <View>
      <DeckList navigation={props.navigation}/>
    </View>
  )
}

const AppNavigator = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Deck List",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(100,100,100,1.0)'
      }
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(100,100,100,1.0)'
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: "New Deck",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(100,100,100,1.0)'
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: "New Question",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(100,100,100,1.0)'
      }
    }
  },  
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'rgba(100,100,100,1.0)'
      }
    }
  },
})

export default class App extends React.Component {

  componentDidMount() {
    clearLocalNotification();
    setLocalNotification();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(220,220,220,1.0)'}}>
        <AppNavigator/>
      </View>
    );
  }
}