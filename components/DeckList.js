import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DeckTab from './DeckTab';
import { testDeck1 } from '../api'
import { testDeck2 } from '../api'
import { testDeck3 } from '../api'


class DeckList extends Component {

    render() {
        return (
            <View style={{paddingBottom: 100}}>
                <ScrollView >
                    <Text style={[styles.DarkText, {marginTop: 20, marginLeft: 22}]}>Select a deck...</Text>
                    <DeckTab navigation={this.props.navigation} deck={testDeck1}/> 
                    <DeckTab navigation={this.props.navigation} deck={testDeck2}/> 
                    <DeckTab navigation={this.props.navigation} deck={testDeck3}/>                                                                           
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
})

export default DeckList;