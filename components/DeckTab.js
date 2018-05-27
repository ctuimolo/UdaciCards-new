import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


class DeckTab extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.DeckTab} onPress={() => this.props.navigation.navigate('DeckView', {deck: this.props.deck})}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>{this.props.deck.title}</Text>
                <Text style={{color: 'white', fontSize: 20}}> Cards: {this.props.deck.questions.length}</Text>                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    DeckTab: {
        backgroundColor: 'rgb(150,100,180)',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center'        
    }
})

export default DeckTab;