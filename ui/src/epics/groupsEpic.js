import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from '../config';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { ActionType, apiErrorOccurred, assignStudentSuccess, createGroupSuccess, fetchGroups, fetchGroupsSuccess, removeStudentSuccess } from "../actions/actions";
import { of } from "rxjs";
import { getToken } from '../selectors/authSelectors';

const fetchGroupsEpic = (action$, state) => action$.pipe(
  ofType(ActionType.FETCH_GROUPS),
  mergeMap(action =>
    ajax.getJSON(`${API_URL}/groups`, {'Authorization': getToken(state.value)}).pipe(
      map(response => fetchGroupsSuccess(response.groups)),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const assignStudentEpic = (action$, state) => action$.pipe(
  ofType(ActionType.ASSIGN_STUDENT),
  mergeMap((action) =>
    ajax.post(`${API_URL}/groups/assignStudent`, JSON.stringify(action.payload), { 'Content-Type': 'application/json', 'Authorization': getToken(state.value) }).pipe(
      map(wholeRequestData => assignStudentSuccess()),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const removeStudentEpic = (action$, state) => action$.pipe(
  ofType(ActionType.REMOVE_STUDENT),
  mergeMap((action) =>
    ajax.post(`${API_URL}/groups/removeStudent`, JSON.stringify(action.payload), { 'Content-Type': 'application/json', 'Authorization': getToken(state.value) }).pipe(
      map(wholeRequestData => removeStudentSuccess()),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const createGroupEpic = (action$, state) => action$.pipe(
  ofType(ActionType.CREATE_GROUP),
  mergeMap((action) =>
    ajax.post(`${API_URL}/groups`, JSON.stringify(action.payload), { 'Content-Type': 'application/json', 'Authorization': getToken(state.value) }).pipe(
      map(wholeRequestData => createGroupSuccess()),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const fetchGroupsAfterAssigningEpic = (action$, state) => action$.pipe(
  ofType(ActionType.ASSIGN_STUDENT_SUCCESS),
  map(wholeRequestData => fetchGroups()),
);

const fetchGroupsAfterRemovingEpic = (action$, state) => action$.pipe(
  ofType(ActionType.REMOVE_STUDENT_SUCCESS),
  map(wholeRequestData => fetchGroups()),
);

const fetchGroupsAfterCreatingGroupEpic = (action$, state) => action$.pipe(
  ofType(ActionType.CREATE_GROUP_SUCCESS),
  map(wholeRequestData => fetchGroups()),
);

export default [
  fetchGroupsEpic,
  assignStudentEpic,
  removeStudentEpic,
  createGroupEpic,
  fetchGroupsAfterAssigningEpic,
  fetchGroupsAfterRemovingEpic,
  fetchGroupsAfterCreatingGroupEpic
];