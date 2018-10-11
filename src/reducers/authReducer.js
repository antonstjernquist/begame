
const initialState = {
  fetched: false,
  data: '',
  token: null
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED': {
      return {
        ...state, fetched: true, data: action.payload,
      };
    }
    case 'TOKEN_RECIEVED': {
      console.log('New state: ', { ...state, fetched: true, token: action.payload });
      localStorage.setItem('jwt', action.payload);
      return {
        ...state, fetched: true, token: action.payload, justLoggedIn: true
      };
    }
    default: return state;
  }
}
