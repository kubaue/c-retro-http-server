import { ActionType } from "../actions/actions";

const initialState = {
  token: ''
};

export default function authReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.LOG_IN_SUCCESS:
      return {
        token: action.payload.token
      };
    case ActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
