import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from '../config';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { ActionType, apiErrorOccurred, fetchStudentsSuccess } from "../actions/actions";
import { of } from "rxjs";
import { getToken } from '../selectors/authSelectors';

const fetchStudentsEpic = (action$, state) => action$.pipe(
  ofType(ActionType.FETCH_STUDENTS),
  mergeMap(action =>
    ajax.getJSON(`${API_URL}/students`, {'Authorization': getToken(state.value)}).pipe(
      map(response => fetchStudentsSuccess(response.students)),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);


export default [
  fetchStudentsEpic,
];