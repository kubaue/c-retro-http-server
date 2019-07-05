import { ActionType } from "../actions/actions";

const initialState = {
  entries: []
};

export default function studentsReducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.FETCH_STUDENTS_SUCCESS:
      return {
        students: action.payload.students,
      };
    case ActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
