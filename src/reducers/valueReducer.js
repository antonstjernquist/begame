export const ADD_TO_VALUE_EXAMPLE = 'ADD_TO_VALUE_EXAMPLE';

let reducer = (state = { value: 0 }, action ) => {

  switch ( action.type ) {

    case ADD_TO_VALUE_EXAMPLE:
      return state += action.data ? action.data : 1;

    default:
      return state;
  }

}

export default reducer;
