import { ActionType } from "../actions/actions";

const initialState = {
  entries: []
};

export default function groupsReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.FETCH_GROUPS_SUCCESS:
      return {
        groups: action.payload.groups,
      };
    case ActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
