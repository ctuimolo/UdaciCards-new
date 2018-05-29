import { AsyncStorage } from 'react-native';

export const testDeck1 = {
    title: 'Test deck 1',
    questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
      ]
}

export const testDeck2 = {
    title: 'Test deck 2',
    questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
}

export const testDeck3 = {
    title: 'Test deck 3',
    questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
    ]
}

export async function createNewDeck(deckTitle) {

  let newDeck = {};
  newDeck.title = deckTitle;
  newDeck.questions = [];

  let data = await AsyncStorage.getItem('data');
  if( data !== null ) {
    dataObj = JSON.parse(data);
    dataObj.decks.push(newDeck);
    let newData = JSON.stringify(dataObj);
    AsyncStorage.setItem('data', newData);

  } else {
    let dataObj = {};
    dataObj["decks"] = [];
    dataObj.decks.push(newDeck);
    let newData = JSON.stringify(dataObj);
    AsyncStorage.setItem('data', newData);
  }
}

export const emptyDeck = {
    title: 'emptyDeck',
    questions: []
}