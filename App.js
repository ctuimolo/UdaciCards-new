import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import QuizView from './components/QuizView'

function Home (props) {
  return (
    <View>
      <TouchableOpacity style={styles.NewDeckHeader} onPress={() => props.navigation.navigate('NewDeck')}>
        <Text style={styles.NewDeckText}>+ Add New Deck</Text>
      </TouchableOpacity>
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
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(220,220,220,1.0)'}}>
        <AppNavigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  NewDeckHeader: {
    padding: 0,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    borderColor: 'rgba(100,100,100,1.0)',
    borderWidth: 2,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  NewDeckText: {
    fontSize: 20,
  },
})