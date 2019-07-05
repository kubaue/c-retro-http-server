export const ActionType = {
  LOG_IN: 'LOG_IN',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILED: 'LOG_IN_FAILED',
  LOG_OUT: 'LOG_OUT',
  API_ERROR_OCCURRED: 'API_ERROR_OCCURRED'
};

export const logIn = (login, password) => {
  return {
    type: ActionType.LOG_IN,
    payload: {
      login,
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

export const logInFailed = () => {
  return {
    type: ActionType.LOG_IN_FAILED,
    payload: {}
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
