import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from '../config';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import {
  ActionType,
  apiErrorOccurred,
  completeExamSuccess,
  createExamSuccess,
  fetchCompletedExams,
  fetchCompletedExamsSuccess,
  fetchExams,
  fetchExamsSuccess
} from "../actions/actions";
import { of } from "rxjs";
import { getToken } from '../selectors/authSelectors';

const fetchExamsEpic = (action$, state) => action$.pipe(
  ofType(ActionType.FETCH_EXAMS),
  mergeMap(action =>
    ajax.getJSON(`${API_URL}/exams`, {'Authorization': getToken(state.value)}).pipe(
      map(response => fetchExamsSuccess(response.exams)),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const fetchCompletedExamsEpic = (action$, state) => action$.pipe(
  ofType(ActionType.FETCH_COMPLETED_EXAMS),
  mergeMap(action =>
    ajax.getJSON(`${API_URL}/completedExams`, {'Authorization': getToken(state.value)}).pipe(
      map(response => fetchCompletedExamsSuccess(response.completedExams)),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const createExamEpic = (action$, state) => action$.pipe(
  ofType(ActionType.CREATE_EXAM),
  mergeMap((action) =>
    ajax.post(`${API_URL}/exams`, JSON.stringify(action.payload), { 'Content-Type': 'application/json', 'Authorization': getToken(state.value) }).pipe(
      map(wholeRequestData => createExamSuccess()),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const completeExam = (action$, state) => action$.pipe(
  ofType(ActionType.COMPLETE_EXAM),
  mergeMap((action) =>
    ajax.post(`${API_URL}/completeExam`, JSON.stringify(action.payload), { 'Content-Type': 'application/json', 'Authorization': getToken(state.value) }).pipe(
      map(wholeRequestData => completeExamSuccess()),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

const fetchExamsAfterAssigningEpic = (action$, state) => action$.pipe(
  ofType(ActionType.CREATE_EXAM_SUCCESS),
  map(wholeRequestData => fetchExams()),
);

const fetchCompletedExamsAfterCompletingEpic = (action$, state) => action$.pipe(
  ofType(ActionType.COMPLETE_EXAM_SUCCESS),
  map(wholeRequestData => fetchCompletedExams()),
);

export default [
  fetchExamsEpic,
  fetchCompletedExamsEpic,
  createExamEpic,
  completeExam,
  fetchExamsAfterAssigningEpic,
  fetchCompletedExamsAfterCompletingEpic
];