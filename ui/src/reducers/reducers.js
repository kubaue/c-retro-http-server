import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupsReducer from './groupsReducer';
import studentsReducer from './studentsReducer';
import examsReducer from './examsReducer';
import completedExamsReducer from './completedExamsReducer';

const reducers = {
  auth: authReducer,
  groups: groupsReducer,
  students: studentsReducer,
  exams: examsReducer,
  completedExams: completedExamsReducer,
};

export default combineReducers(reducers);
