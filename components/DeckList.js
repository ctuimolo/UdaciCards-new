import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { ScreenVisibilityListener } from 'react-native-navigation'
import { StackActions, NavigationActions } from 'react-navigation'
import DeckTab from './DeckTab';
import { testDeck1 } from '../api'
import { testDeck2 } from '../api'
import { testDeck3 } from '../api'
import { createNewDeck } from '../api'


class DeckList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            deckList: [],
        }
    }

    componentDidMount() {
        this.updateList();
    }

    makeUpdate = () => {
        this.setState({needsUpdating: true});
    }

    updateList = () => {
        AsyncStorage.getItem('data')
            .then( (data) => {
                if(data !== null) {
                    var decksArray = JSON.parse(data).decks;
                    this.setState({
                        deckList: decksArray,
                        needsUpdating: false
                    })
                };
            })
    }

    clearList = () => {
        AsyncStorage.clear()
            .then(this.updateList());
    }

    render() {

        return (
            <View style={{paddingBottom: 100}}>
                <TouchableOpacity 
                    style={styles.NewDeckHeader} 
                    onPress={() => this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'NewDeck' }),
                        ]
                    }))}
                >
                    <Text style={styles.NewDeckText}>+ Add New Deck</Text>
                </TouchableOpacity>
                <ScrollView >
                    {this.state.deckList.length > 0 ? this.state.deckList.map((deck) => {
                        return <DeckTab 
                            key={deck.title} 
                            navigation={this.props.navigation} 
                            deck={deck}
                            updateList={this.makeUpdate}
                            /> 
                    }) 
                    : <View>
                        <Text style={[styles.DarkText,{marginTop: 20, marginLeft: 22, marginRight: 22}]}>
                            There are no decks currently, add a new deck to create flash cards
                        </Text>
                        <Text style={[styles.DarkText,{marginTop: 20, marginLeft: 22, marginRight: 22}]}>
                            Reminders set for 12:00pm, daily
                        </Text>
                    </View>
                    }
                    <View style={{paddingBottom: 100}}/>                                                                    
                </ScrollView>
          </View>            
        )
    }
}

styles = StyleSheet.create({
    DarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(100,100,100)',
    },
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

export default DeckList;