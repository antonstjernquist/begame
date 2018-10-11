const initialState = {
  roomId: null,
  quiez: null,
  currentQuestion: 0,
  timer: {
    started: false,
    stoped: false,
    ended: false,
  }
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ROOM_ID_RECIVED': {
      return {
        ...state, fetched: true, roomId: action.payload,
      };
    }
    default: return state;
  }
}
