import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'

class SubmitButton extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.SubmitButton} onPress={this.props.submitQuestion}>
                <Text style={styles.ButtonText}>+ Submit Question</Text>
            </TouchableOpacity>
        )
    }
}

function FakeButton (props) {
    return (
        <View style={styles.FakeButton}>
            <Text style={styles.ButtonText}>Please fill parameters</Text>
        </View>
    )
}

class NewQuestion extends Component {

   constructor(props) {
       super(props);
       this.state = {
           questionText: '',
           answerText: '',
       }
       this.submitQuestion = this.submitQuestion.bind(this);
    }

    static navigationOptions = ({ navigation, screenProps}) => ({
        headerLeft: <TouchableOpacity
            onPress={ () => { navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home'}),
                ]
            }))}} ><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{'  <<'}</Text></TouchableOpacity>,           
    })

    componentDidMount() {
        this.deckTitle  = this.props.navigation.state.params.deckTitle;
    }

    async submitQuestion () {

        newQuestion = {
            question: this.state.questionText,
            answer: this.state.answerText,
        }

        var data = await AsyncStorage.getItem('data');
        var dataObj = JSON.parse(data);
        for(var i in dataObj["decks"]) {
            if (this.deckTitle === dataObj["decks"][i].title) {
                dataObj["decks"][i].questions.push(newQuestion);
                var newData = JSON.stringify(dataObj);
                AsyncStorage.setItem('data', newData);   
            }
        }

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'DeckView', params: {deckTitle: this.deckTitle }}),
            ]
        }));    
    };

    render () {
        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <Text style={[styles.Text, {marginTop: 80}]}>Qestion:</Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.Input}
                        placeholder='Input question here...'
                        placeholderTextColor='rgb(200,200,200)'
                        onChangeText={(text) => this.setState({questionText: text})}
                    />
                    <Text style={styles.Text}>Answer:</Text>                
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.Input}
                        placeholder='Input answer here...'
                        placeholderTextColor='rgb(200,200,200)'
                        onChangeText={(text) => this.setState({answerText: text})}
                    />
                    { this.state.questionText && this.state.answerText !== ''
                        ? <SubmitButton submitQuestion={this.submitQuestion}/>
                        : <FakeButton/>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
  
const styles = StyleSheet.create({
    Input: {
        backgroundColor: 'white',   
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        padding: 20,
        borderRadius: 10,
        fontWeight: 'bold',
    },
    Text: {
        marginLeft:20,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'rgb(200,200,200)'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    SubmitButton: {
        backgroundColor: 'rgb(100,220,180)',   
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
  
export default NewQuestion;