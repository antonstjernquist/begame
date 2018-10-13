

export function setRoom(data) {
  return {
    type: 'ROOM_RECIVED',
    payload: data,
  };
}


export const createRoomAction = (data, dispatch) => async (dispatch, getState) => {

  const { history, room } = data;

  const token = localStorage.getItem('token');
  console.log('Room is: ', room);
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
    console.log('Response from createRoom: ', response);
    dispatch(setRoom(response.content))
    history.push('/project/' + response.content.roomId);
  } else {
      console.log(response);
  }

}
