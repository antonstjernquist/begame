
const initialState = {
  fetched: false,
  name: '',
  token: null
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED': {
      console.log(action);
      if (!action ) {
        return state;
      }
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        ...state, fetched: true, name: action.payload.name , token: action.payload.token,
      };
    }
    case 'TOKEN_RECIEVED': {
      return {
        ...state, fetched: true, token: action.payload
      };
    }
    case 'USER_LOGOUT': {
      console.log('Logging out user.');
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      return {
        ...state, fetched: true, token: null, user: null
      };
    }
    default: return state;
  }
}
