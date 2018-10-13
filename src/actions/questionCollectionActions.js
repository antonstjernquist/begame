import { showSnackbarError } from '../actions/errorHandlingActions';


export function setCollection(data) {
  return {
    type: 'COLLECTION_RECIEVED',
    payload: data,
  };
}

export const getQuestionCollections = (data, dispatch) => async (dispatch, getState) =>{
  const { history, user } = data;
  const { name, password } = user;
  const token = localStorage.getItem(token);

  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/question-collection', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  });

  const response = await rawResponse.json();


  if(response.success){
    dispatch(setCollection(response.content))
  } else {
    dispatch(showSnackbarError('Något gick fel vid hämting Quiz.'));
  }

}
