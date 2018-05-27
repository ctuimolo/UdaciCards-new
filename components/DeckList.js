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
                    <DeckTab navigation={this.props.navigation} deck={testDeck1}/> 
                    <DeckTab navigation={this.props.navigation} deck={testDeck2}/> 
                    <DeckTab navigation={this.props.navigation} deck={testDeck3}/>                                                                           
                </ScrollView>
          </View>            
        )
    }
}

export default DeckList;