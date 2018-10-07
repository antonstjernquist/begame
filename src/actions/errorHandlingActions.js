export function showSnackbarMessage(message) {
  return {
    type: 'SHOW_SNACKBAR_MESSAGE',
    payload: message,
  };
}

export function showSnackbarError(errorMessage) {
  return {
    type: 'SHOW_SNACKBAR_ERROR',
    payload: errorMessage,
  };
}

export function closeFeedback() {
  return {
    type: 'CLOSE_FEEDBACK',
  };
}
