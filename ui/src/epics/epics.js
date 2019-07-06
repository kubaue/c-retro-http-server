import { combineEpics } from "redux-observable";
import authEpic from "./authEpic";
import studentsEpic from './studentsEpic';
import groupsEpic from './groupsEpic';
import examsEpic from './examsEpic';

export const rootEpic = combineEpics(
  ...authEpic,
  ...studentsEpic,
  ...groupsEpic,
  ...examsEpic
);

