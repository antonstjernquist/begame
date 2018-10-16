

export function setRoom(data) {
  return {
    type: 'ROOM_RECIVED',
    payload: data,
  };
}

export function updateRoom(data) {
  return {
    type: 'ROOM_UPATED',
    payload: data,
  };
}


export const createRoomAction = (data, dispatch) => async (dispatch, getState) => {
  const { history, room } = data;
  const token = localStorage.getItem('token');

  if(!token || token === 'undefined'){
      console.log('No token specified. No data to retrieve for you.');
      return;
  }

  const rawResponse = await fetch('https://stark-ocean-61611.herokuapp.com/api/rooms/add', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(
        room
    )
  });

  const response = await rawResponse.json();

  if(response.success){
    dispatch(setRoom(response.content))
    history.push('/project/' + response.content.roomId);
  } else {
      console.log(response);
  }

}


export const getRoomFromDb = (roomId, dispatch) => async (dispatch, getState) => {

  const rawResponse = await fetch(`https://stark-ocean-61611.herokuapp.com/api/rooms/${roomId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const response = await rawResponse.json();

  if(response.success){
    dispatch(setRoom(response.content[0]))
  } else {
      console.log(response);
  }
}


export const updateRoomInDb = (data, dispatch) => async (dispatch, getState) => {
  const token = localStorage.getItem('token');
  const { roomIdInDb } = data;
  if(!token || token === 'undefined'){
    console.log('No token specified. No data to retrieve for you.');
    return;
  }

  const rawResponse = await fetch(`https://stark-ocean-61611.herokuapp.com/api/rooms/edit/${roomIdInDb}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(
        data.update
    )
  });

  const response = await rawResponse.json();

  if(response.success){
    dispatch(setRoom(response.content))
  } else {
    console.log(response);
  }

}
