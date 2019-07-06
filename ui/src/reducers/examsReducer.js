import { ActionType } from "../actions/actions";

const initialState = {
  entries: []
};

export default function examsReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.FETCH_EXAMS_SUCCESS:
      return {
        entries: action.payload.exams,
      };
    case ActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
