
const initialState = {
  fetched: false,
  name: '',
  token: null
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED': {
      if (!action ) {
        return state;
      }
        if (action.payload.token ) {
          localStorage.setItem('token', action.payload.token);
        }
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
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      return {
        ...state, fetched: true, token: null, user: null
      };
    }
    default: return state;
  }
}
