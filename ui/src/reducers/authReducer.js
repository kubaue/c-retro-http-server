import { ActionType } from "../actions/actions";

const initialState = {
  token: '',
  attemptFailed: false
};

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOG_IN_SUCCESS:
      return {
        token: action.payload.token,
        attemptFailed: false
      };
    case ActionType.LOG_IN_FAILED:
      return {
        attemptFailed: true
      };
    case ActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
