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


export function updateUserPoints(data) {
  return {
    type: 'UPDATE_POINTS',
    payload: data,
  };
}


export const getUserInRoom = (data, dispatch) => async (dispatch, getState) => {
  const { roomId, failMsg } = data;

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
    if( failMsg ){
      dispatch(showSnackbarError('Något gick fel vid hämtning av användare.'));
    }
  }
}


export const updateUserInDb = (data, dispatch) => async (dispatch, getState) => {
  const { uid, points } = data;
  const rawResponse = await fetch(`https://stark-ocean-61611.herokuapp.com/api/activeUsers/edit/${uid}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        points
      })
    });


  const response = await rawResponse.json();
  if(response.success){
    dispatch(updateUserPoints({points}));
  } else {
    dispatch(showSnackbarError('Fel användarnamn eller lösenord.'));
  }

}
