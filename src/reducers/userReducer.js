export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_POINTS = 'UPDATE_POINTS';

const initialState = {
  fetched: false,
  data:{}
}

export default function reducer(state = initialState, action ) {

  switch ( action.type ) {
    case UPDATE_USER:
      localStorage.setItem('student', JSON.stringify(action.payload));
      return {...state, data: action.payload , fetched: true}

    case UPDATE_POINTS:
      // local storage update
      const student = JSON.parse(localStorage.getItem('student'));
      student.points = action.payload.points;
      localStorage.setItem('student', JSON.stringify(student));

      const newState = { ...state};
      newState.data.points = action.payload.points;
      return newState
    default:
      return state;
  }

}
