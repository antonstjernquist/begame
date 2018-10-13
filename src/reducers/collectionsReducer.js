
const questData = {
  wedw232332: {
    title: 'Javascript',
    imgUrl: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&h=350',
    questions: {
      dwdwd: {
        question: 'hur många ben finns det i abborre?',
        answers: {
          a: 2,
          b: 0,
          c: 1,
          d: 3,
        },
        correctAnswer: 'a',
      },
      dwddefewrkey: {
        question: 'är himmeln blå?',
        answers: {
          a: 'Nej',
          b: 'Ja',
        },
        correctAnswer: 'b',
      },
      dwdweeer3d: {
        question: 'När inträffar julen?',
        answers: {
          a: 'Dagen före annandag jul',
          b: 'Dagen innan julafton',
          c: 'Två dagar före julafton',
          d: 'Två dagar före annandag jul',
        },
        correctAnswer: 'd',
      },
    }
  },
  wwewewww: {
    title: 'Javascript Vanilla',
    imgUrl: 'https://images.pexels.com/photos/248515/pexels-photo-248515.png?auto=compress&cs=tinysrgb&h=350',
    questions: {
      dwdwd: {
        question: 'Vad står nan för?',
        answers: {
          a: 'Not a nickle',
          b: 'normalize a number',
          c: 'not a number',
          d: 'mabe a number',
        },
        correctAnswer: 'c',
      },
      dwddefewrkey: {
        question: 'är vattnet vått?',
        answers: {
          a: 'Nej',
          b: 'Ja',
        },
        correctAnswer: 'b',
      },
      dwdweeer3d: {
        question: 'är Gustav här?',
        answers: {
          a: 'Ja',
          b: 'Nej',
        },
        correctAnswer: 'a',
      },
    }
  }
}

const initialState = {
  fetched: true,
  data: questData,
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'COLLECTION_RECIEVED': {
      return {
        ...state, fetched: true, data: action.payload,
      };
    }
    default: return state;
  }
}
