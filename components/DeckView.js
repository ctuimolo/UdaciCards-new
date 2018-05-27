import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

function QuestionTab (props) {
    return (
        <View style={styles.QuestionTab}>
            <Text style={styles.QuestionText}>{props.question.question}</Text>
            <Text style={styles.AnswerText}>{props.question.answer}</Text>
        </View>
    )
}

class QuizButton extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.QuizButton} onPress={this.props.navigateToQuiz}>
            <Text style={styles.WhiteText}>Start Quiz</Text>
            </TouchableOpacity>
        )
    }
}

class DeckView extends Component {

    deck = this.props.navigation.state.params.deck;

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('deck').title,
        }
    }

    navigateToQuiz = () => {
        this.props.navigation.navigate('QuizView',{deck: this.deck});
    };

    render() {

        return (
            <View style={{paddingBottom: 50}}>
                <TouchableOpacity style={styles.AddQuestionHeader} onPress={() => {this.props.navigation.navigate('NewQuestion')}}>
                   <Text style={styles.AddQuestionText}>+ Add New Question</Text>
                </TouchableOpacity>
                <ScrollView>
                    <Text style={[styles.DarkText, {marginLeft: 22, marginTop: 20}]}>This deck has {this.deck.questions.length} flashcards...</Text>
                    {this.deck.questions.length > 0 
                     ? <QuizButton navigateToQuiz={this.navigateToQuiz}/>
                     : <View style={styles.Notification}>
                            <Text style={styles.WhiteText}>Add a question to make a flashcard</Text>
                       </View>
                    }
                    {this.deck.questions.map((question) => (
                        <QuestionTab question={question} key={Math.random()}/>
                    ))}               
                </ScrollView>
            </View>
        )
    }
  }

const styles = StyleSheet.create({
    AddQuestionHeader: {
      padding: 0,
      paddingTop: 12,
      paddingBottom: 12,
      alignItems: 'center',
      borderColor: 'rgba(100,100,100,1.0)',
      borderWidth: 2,
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    AddQuestionText: {
      fontSize: 20,
    },
    QuizButton: {
        backgroundColor: 'rgb(200,100,200)',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center'
    },   
    Notification: {
        backgroundColor: 'rgb(200,200,200)',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    QuestionTab: {
        backgroundColor: 'rgb(100,100,100)',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    QuestionText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    AnswerText: {
        backgroundColor: 'rgb(240,240,240)',
        color: 'rgb(100,100,100)',
        padding: 8,
        borderRadius: 6,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    DarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(100,100,100)',
    },
    WhiteText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default DeckView;