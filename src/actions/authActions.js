import { showSnackbarError } from './errorHandlingActions.js';
import { updateUserStats } from './userActions.js';
//
export function setUser(data) {
  return {
    type: 'AUTH_RECEIVED',
    payload: data,
  };
}

export function logoutUserAction() {
  return {
    type: 'USER_LOGOUT'
  };
}

export const loginAsAdmin = (data, dispatch) => async (dispatch, getState) => {
  const { history, user } = data;
  const { name, password } = user;

  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/authenticate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name,
        password,
      }
    )
  });


  const response = await rawResponse.json();
  if(response.success){
    const data = {
      name,
      token: response.content.token
    }
    dispatch(setUser(data))

    history.push('/admin/home');
  } else {
    dispatch(showSnackbarError('Fel användarnamn eller lösenord.'));
  }

}


export const loginAsStudent = (data, dispatch) => async (dispatch, getState) => {
  const { history, username, roomId } = data;


  // lägg till användaren i rummet..
  // logga in och byt sida
  // getRoomFromDb().then( ()=>{
  //
  // })

  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/activeUsers/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        name: username,
        points: 0,
        roomId
      }
    )
  });


  const response = await rawResponse.json();
  if(response.success){
    const data = {
      name: username,
      token: response.content.token,
      uid: response.content['_id'],
      points: 0,
    }
    console.log('repsonse data in auth:', response.content);
    // dispatch(setUser(data))

    dispatch(updateUserStats(data));
    history.push(`/room/${roomId}`);
  } else {
    dispatch(showSnackbarError('Fel användarnamn eller lösenord.'));
  }

}
