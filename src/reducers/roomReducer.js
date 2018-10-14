
export const ROOM_RECIVED = 'ROOM_RECIVED';

const initialState = {
  fetched: false,
  timer: {
    started: false,
    stoped: false,
    ended: false,
  },
}

export default function reducer(state = initialState, action ) {

  switch ( action.type ) {
    case ROOM_RECIVED:
      return {...state, data: action.payload , fetched: true}

    default:
      return state;
  }

}
