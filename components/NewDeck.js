import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { emptyDeck } from '../api'

class SubmitButton extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.SubmitButton} onPress={this.props.submitDeck}>
                <Text style={styles.ButtonText}>+ Submit Deck</Text>
            </TouchableOpacity>
        )
    }
}

function FakeButton (props) {
    return (
        <View style={styles.FakeButton}>
            <Text style={styles.ButtonText}>Please enter title</Text>
        </View>
    )
}

class NewDeck extends Component {

   constructor(props) {
       super(props);
       this.state = {
           text: '',
       }
    }

    submitDeck = () => {
        this.props.navigation.dispatch(StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'DeckView', params: {deck: emptyDeck }}),
            ]
        }));    
    };

    render () {
        return (
            <KeyboardAvoidingView>
                <TextInput
                    underlineColorAndroid='transparent'
                    style={styles.Input}
                    placeholder='Input deck title here...'
                    placeholderTextColor='rgb(200,200,200)'
                    onChangeText={(text) => this.setState({text: text})}
                />
                { this.state.text !== ''
                    ? <SubmitButton submitDeck={this.submitDeck}/>
                    : <FakeButton/>
                }
            </KeyboardAvoidingView>
        )
    }
}
  
const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',   
        marginTop:30,     
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        padding: 20,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    Text: {
        marginTop: 60,
        padding: 20,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(100,100,100)'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    SubmitButton: {
        backgroundColor: 'rgb(100,100,255)',   
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },    
    FakeButton: {
        backgroundColor: 'rgb(200,200,200)',   
        margin: 20,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    }
});
  
export default NewDeck;