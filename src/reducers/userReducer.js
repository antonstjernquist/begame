export const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  fetched: false,
  data:{}
}

export default function reducer(state = initialState, action ) {

  switch ( action.type ) {
    case UPDATE_USER:
      return {...state, data: action.payload , fetched: true}

    default:
      return state;
  }

}
