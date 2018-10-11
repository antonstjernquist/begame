
import { showSnackbarError, showSnackbarMessage } from './errorHandlingActions.js';

//
export function setUser(data) {
  return {
    type: 'AUTH_RECEIVED',
    payload: data,
  };
}

export const loginAsAdmin = (data, dispatch) => async (dispatch, getState) =>{
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

  const content = await rawResponse.json();

  if(content.success){
    const data = {
      token: content.token,
      name,
    }
    dispatch(setUser(data))
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
