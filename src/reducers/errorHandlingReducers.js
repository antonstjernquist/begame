const initialState = {
  message: 'Initial message',
  error: false,
  snackbarOpen: false,
};

export default function errorHandlingReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SNACKBAR_MESSAGE': {
      return {
        ...state, error: false, snackbarOpen: true, message: action.payload,
      };
    }
    case 'SHOW_SNACKBAR_ERROR': {
      return {
        ...state, error: true, snackbarOpen: true, message: action.payload,
      };
    }
    case 'CLOSE_FEEDBACK': {
      return { ...state, snackbarOpen: false, dialogOpen: false };
    }
    default: return state;
  }
}
