import { showSnackbarError } from '../actions/errorHandlingActions';


export function setCollection(data) {
  return {
    type: 'COLLECTION_RECIEVED',
    payload: data,
  };
}

export const getQuestionCollections = (dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  console.log('Token is: ', token);
  if(!token || token === 'undefined'){
      console.log('No token specified. No data to retrieve for you.');
      return;
  }
  // const token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmJjYTViNzcyOGNlYTAwMDQ5MjdmZWIiLCJuYW1lIjoiam9oYW4iLCJwYXNzd29yZCI6IiQyYSQxMCRIMUN5RTl3dnp0TFQ5UEZrdmVad0ZldWg0MzlzTHBXLjl1ZnFhTDR6anFjVlV1ODJMcHp6VyIsIl9fdiI6MH0.J03YO2XbTR4iOLWnLDKAXv6lQhGMOcv-6sB1xWuTvW4"
  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/question-collection', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  });

  const response = await rawResponse.json();
  console.log('Response: ',response);

  if(response.success){
    dispatch(setCollection(response.content))
  } else {
    dispatch(showSnackbarError('Något gick fel vid hämting Quiz.'));
  }
}

export const createCollectionAction = (data, dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  console.log('Token is: ', token);
  if(!token || token === 'undefined'){
      console.log('No token specified. No data to post for you.');
      return;
  }

  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/question-collection/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify (
        data
    )
  });

  const response = await rawResponse.json();
  console.log('Response: ',response);

  if(response.success){
    console.log('success');
  } else {
    dispatch(showSnackbarError('Något gick fel vid hämting Quiz.'));
  }
}
