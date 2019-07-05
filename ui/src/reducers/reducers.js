import { combineReducers } from "redux";
import authReducer from "./authReducer";
import groupsReducer from './groupsReducer';
import studentsReducer from './studentsReducer';

const reducers = {
  auth: authReducer,
  groups: groupsReducer,
  students: studentsReducer
};

export default combineReducers(reducers);
