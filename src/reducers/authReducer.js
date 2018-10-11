
const initialState = {
  fetched: false,
  name: '',
  token: null
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED': {
      return {
        ...state, fetched: true, name: action.payload.name , token: action.payload.token,
      };
    }
    case 'TOKEN_RECIEVED': {
      console.log('New state: ', { ...state, fetched: true, token: action.payload });
      return {
        ...state, fetched: true, token: action.payload, justLoggedIn: true
      };
    }
    default: return state;
  }
}
