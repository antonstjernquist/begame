export const ADD_TO_VALUE_EXAMPLE = 'ADD_TO_VALUE_EXAMPLE';

let reducer = (state = { value: 0 }, action ) => {

  switch ( action.type ) {

    case ADD_TO_VALUE_EXAMPLE:
      console.log('Loading in reducer lullululul');
      return state;

    default:
      return state;
  }

}

export default reducer;
