
import { showSnackbarError, showSnackbarMessage } from './errorHandlingActions.js';

//
export function setUser(data) {
  return {
    type: 'AUTH_RECEIVED',
    payload: data,
  };
}
export function setToken(data) {
  return {
    type: 'TOKEN_RECIEVED',
    payload: data,
  };
}

// export const authData = dispatch => (dispatch,user) => {
//   console.log(user);
//   dispatch(setUser(user))
// }
// export const loginAsAdmin = (test,dispatch) => async (dispatch,getState,test) =>{
//
export const loginAsAdmin = (history, dispatch) => async (dispatch, getState) =>{
  const { auth } = getState();
  console.log('user:', auth.data);
  const { name } = auth.data;
  const { password } = auth.data;

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

  const content = await rawResponse.json();

  if(content.success){
    dispatch(setToken(content.token));
    history.push('/admin/home');
  } else {
    dispatch(showSnackbarError('Fel användarnamn eller lösenord.'));
  }

}



//
// export const authenticationListener = () => async (dispatch, history) => {
//     try {
//       return new Promise((resolve, reject) => {
//         return getFirebase().auth().onAuthStateChanged(async (user) =>  {
//           if (user) {
//             const fetchedUser = await dispatch(getEntireAuthUser(user.uid))
//             dispatch(setEmail(user.email))
//             dispatch(setUid(user.uid))
//             return resolve(fetchedUser)
//           } else {
//             reject({message: "No user"})
//           }
//         })
//       })
//     } catch(e) {
//       console.log(e)
//       dispatch(fetchingError(e))
//       return Promise.reject(e);
//     }
// }