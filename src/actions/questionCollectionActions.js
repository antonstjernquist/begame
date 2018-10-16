import { showSnackbarError } from '../actions/errorHandlingActions';


export function setCollection(data) {
  return {
    type: 'COLLECTION_RECIEVED',
    payload: data,
  };
}

export function addToCollection(data) {
  return {
    type: 'COLLECTION_ADD',
    payload: data,
  };
}

export function updateCollection(data) {
  return {
    type: 'COLLECTION_UPDATE',
    payload: data,
  };
}
export function deleteCollection(data) {
  return {
    type: 'COLLECTION_DELETE',
    payload: data,
  };
}

export const getQuestionCollections = (dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
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


  if(response.success){
    dispatch(setCollection(response.content))
  } else {
    dispatch(showSnackbarError('Något gick fel vid hämting Quiz.'));
  }
}

/* Add collection */
export const createCollectionAction = (data, dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if(!token || token === 'undefined'){
      console.log('No token specified.');
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
  if(response.success){

    /* Add to store */
    dispatch(addToCollection(response.content));

    /* Implement snackbar here? */

  } else {
    dispatch(showSnackbarError('Något gick fel vid skapande av Quiz.'));
  }
}

/* Update collection */
export const updateCollectionAction = (data, dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if(!token || token === 'undefined'){
      console.log('No token specified.');
      return;
  }

  const url = 'https://stark-ocean-61611.herokuapp.com/api/question-collection/update/' + data._id;
  const rawResponse = await fetch(url, {
    method: 'PUT',
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
  if(response.success){

    /* Update in store (Updating directly, since api sends back old data) */
    dispatch(updateCollection(data));

    /* Implement snackbar here? */

  } else {
    dispatch(showSnackbarError('Något gick fel vid uppdaterande av Quiz.'));
  }
}

/* Remove collection */
export const removeCollectionAction = (id, dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');

  if(!token || token === 'undefined'){
      console.log('No token specified.');
      return;
  }

  const url = 'https://stark-ocean-61611.herokuapp.com/api/question-collection/delete/' + id;
  const rawResponse = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  });

  const response = await rawResponse.json();
  console.log('Response: ', response);

  if(response.success){

      /* Remove from store */
      dispatch(deleteCollection(response.content));

      /* Implement snackbar here? */

  } else {
    dispatch(showSnackbarError('Något gick fel vid radering av Quiz.'));
  }
}
