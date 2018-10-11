
const questData = {
  wedw232332: {
    title: 'Javascript',
    questions: {
      dwdwd: {
        question: 'hur många ben finns det i abborre?',
        answers: {
          a: 2,
          b: 0,
          c: 1,
          d: 3,
        },
        rightAnswer: 'a',
      },
      dwddefewrkey: {
        question: 'är himmeln blå?',
        answers: {
          a: 'Nej',
          b: 'Ja',
        },
        rightAnswer: 'b',
      },
      dwdweeer3d: {
        question: 'När inträffar julen?',
        answers: {
          a: 'Dagen före annandag jul',
          b: 'Dagen innan julafton',
          c: 'Två dagar före julafton',
          d: 'Två dagar före annandag jul',
        },
        rightAnswer: 'd',
      },
    }
  },
  wwewewww: {
    title: 'Javascript Vanilla',
    questions: {
      dwdwd: {
        question: 'Vad står nan för?',
        answers: {
          a: 'Not a nickle',
          b: 'normalize a number',
          c: 'not a number',
          d: 'mabe a number',
        },
        rightAnswer: 'c',
      },
      dwddefewrkey: {
        question: 'är vattnet vått?',
        answers: {
          a: 'Nej',
          b: 'Ja',
        },
        rightAnswer: 'b',
      },
      dwdweeer3d: {
        question: 'är Gustav här?',
        answers: {
          a: 'Ja',
          b: 'Nej',
        },
        rightAnswer: 'a',
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
