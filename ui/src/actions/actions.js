export const ActionType = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_OUT: 'LOG_OUT',
  API_ERROR_OCCURRED: 'API_ERROR_OCCURRED'
};

export const logIn = (username, password) => {
  return {
    type: ActionType.LOG_IN,
    payload: {
      username,
      password
    }
  }
};

export const logInSuccess = (token) => {
  return {
    type: ActionType.LOG_IN_SUCCESS,
    payload: {
      token
    }
  }
};

export const apiErrorOccurred = (error) => {
  return {
    type: ActionType.API_ERROR_OCCURRED,
    payload: {
      error
    }
  }
};
