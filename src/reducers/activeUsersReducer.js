const initialState = {
  fetched: false,
  data: [],
}
const reducer = (state = initialState , action ) => {

  switch ( action.type ) {
    case 'RECIVED_ALL_USER':
    return {...state, data: action.payload, fetched: true}

    default:
    return state;
  }

}

export default reducer;
