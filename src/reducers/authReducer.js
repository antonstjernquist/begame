
const initialState = {
  fetched: false,
  data: '',
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_RECEIVED': {
      return {
        ...state, fetched: true, data: action.payload,
      };
    }
    default: return state;
  }
}
