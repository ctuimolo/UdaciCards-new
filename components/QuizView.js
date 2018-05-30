import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { NavigationActions, StackActions } from 'react-navigation'

class ResultsCard extends Component {

    percent = Math.round((this.props.numberCorrect / this.props.total) * 100);

    render() {
        return (
            <ScrollView>
                <View style={[styles.QuizCard,{marginTop:60}]}>
                    <Text style={styles.WhiteText}>Results:</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={[styles.WhiteText,{ fontSize: 36, color:'rgb(250,200,90)'}]}>{this.percent}% correct!</Text> 
                    </View>
                    <Text style={styles.WhiteText}>Got {this.props.numberCorrect} out of {this.props.total} flash cards</Text>      
                    <TouchableOpacity 
                        style={[styles.ToggleButtton, {alignItems: 'center', backgroundColor:'rgb(20,180,200)', marginTop: 30}]}
                        onPress={this.props.restartQuiz}
                    >
                        <Text style={styles.WhiteText}>Tap to restart</Text>
                    </TouchableOpacity>              
                </View>
            </ScrollView>
        )
    }
}

class QuizCard extends Component {


    
    render() {
        return (
            <View style={styles.QuizCard}>
                <Text style={styles.WhiteText}>Question:</Text>
                <View style={styles.QuestionBody}>
                    <Text style={styles.DarkText}>{this.props.question}</Text>
                </View>
                { this.props.showAnswer 
                 ? <View><Text style={styles.WhiteText}>Answer:</Text>
                    <View style={styles.QuestionBody}>
                     <Text style={styles.DarkText}>{this.props.answer}</Text>
                    </View></View>
                 : <TouchableOpacity 
                    style={[styles.ToggleButtton, {alignItems: 'center'}]}
                    onPress={() => {this.props.setShowAnswer(true)}}
                 >
                    <Text style={styles.WhiteText}>tap to show answer</Text>
                 </TouchableOpacity>
                }
            </View>
        )
    }
}

class QuizView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            showAnswer: false,
            numberCorrect: 0,
            showResults: false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Deck Quiz: " + navigation.getParam('deck').title,
        }
    }

    static navigationOptions = ({ navigation, screenProps}) => ({
        title: "Deck Quiz: " + navigation.getParam('deck').title,
        headerLeft: <TouchableOpacity
            onPress={ () => navigation.dispatch(StackActions.pop())} ><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{'  <<'}</Text></TouchableOpacity>,
    })
    
    restartQuiz = () => {

        this.questionsArray = this.shuffle(this.deck.questions);

        this.setState({
            index: 0,
            showAnswer: false,
            numberCorrect: 0,
            showResults: false,
        })
    }

    moveNextQuestion = () => {
        if(this.state.index < this.questionsArray.length - 1)
            this.setState ((prevState, props) => ({ index: prevState.index + 1, showAnswer: false }));
        else {
            clearLocalNotification()
                .then(setLocalNotification);
            this.setState ({ showResults: true });
        }
    }

    correctAndMovenextQuestion = () => {
        this.setState ((prevState, props) => ({ numberCorrect: prevState.numberCorrect + 1 }));
        this.moveNextQuestion();
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }
    
    deck = this.props.navigation.state.params.deck;
    questionsArray = this.shuffle(this.deck.questions);

    render() {
        return (
            <ScrollView>
                {this.state.showResults
                ? <ResultsCard
                    total={this.questionsArray.length}
                    numberCorrect={this.state.numberCorrect}
                    restartQuiz={this.restartQuiz}
                />
                : <View>
                    <Text style={[styles.DarkText, {marginTop: 40, marginLeft: 22, alignItems: 'center'}]}>Flashcard {this.state.index + 1} out of {this.questionsArray.length}...</Text>
                    <QuizCard
                        showAnswer={this.state.showAnswer}
                        setShowAnswer={(value) => this.setState({showAnswer: value})}
                        question={this.questionsArray[this.state.index].question}
                        answer={this.questionsArray[this.state.index].answer}
                    />
                    <TouchableOpacity style={styles.CorrectButtton} onPress={this.correctAndMovenextQuestion}>
                        <Text style={styles.WhiteText}>I got it!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.IncorrectButtton} onPress={this.moveNextQuestion}>
                        <Text style={styles.WhiteText}>I didn't get it...</Text>
                    </TouchableOpacity>
                </View>
                }
            </ScrollView>           
        )
    }
}

const styles = StyleSheet.create({

    QuizCard: {
        backgroundColor: 'rgb(100,100,100)',
        padding: 20,
        marginLeft: 20,
        marginRight:20,
        marginTop: 2,
        borderRadius: 10,
    },
    QuestionBody: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        margin: 6,
    },
    ToggleButtton: {
        backgroundColor: 'rgb(120,150,230)',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        margin: 6,
    },
    WhiteText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    DarkText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(100,100,100)',
    },
    CorrectButtton: {
        alignItems: 'center',
        backgroundColor: 'rgb(120,250,120)',
        padding: 20,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        borderRadius: 10,
    },    
    IncorrectButtton: {
        alignItems: 'center',
        backgroundColor: 'rgb(250,120,120)',
        padding: 20,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 6,
        borderRadius: 10,
        marginBottom: 40,
    },
})

export default QuizView;