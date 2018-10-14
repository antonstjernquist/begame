import { showSnackbarError } from './errorHandlingActions.js';

export function updateUserStats(data) {
  return {
    type: 'UPDATE_USER',
    payload: data,
  };
}


export function updateAllUserStats(data) {
  return {
    type: 'RECIVED_ALL_USER',
    payload: data,
  };
}




export const getUserInRoom = (data, dispatch) => async (dispatch, getState) => {
  const { roomId } = data;

  const rawResponse = await fetch(`https://stark-ocean-61611.herokuapp.com/api/activeUsers/${roomId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });


  const response = await rawResponse.json();
  if(response.success){
    dispatch(updateAllUserStats(response.content))
  } else {
   dispatch(showSnackbarError('Något gick fel vid hämtning av användare.'));
  }

}
