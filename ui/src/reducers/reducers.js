import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupsReducer from './groupsReducer';
import studentsReducer from './studentsReducer';
import examsReducer from './examsReducer';

const reducers = {
  auth: authReducer,
  groups: groupsReducer,
  students: studentsReducer,
  exams: examsReducer
};

export default combineReducers(reducers);
