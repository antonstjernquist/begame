export const ADD_TO_VALUE_EXAMPLE = 'ADD_TO_VALUE_EXAMPLE';

const initialState = {
  title: null,
}

export default function reducer(state = initialState, action ) {

  switch ( action.type ) {

    case ADD_TO_VALUE_EXAMPLE:
      return {...state, title: action.payload}

    default:
      return state;
  }

}
