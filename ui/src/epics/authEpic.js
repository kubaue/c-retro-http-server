import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from '../config';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { ActionType, apiErrorOccurred, logInSuccess } from "../actions/actions";
import { of } from "rxjs";

const logInEpic = (action$, state) => action$.pipe(
  ofType(ActionType.LOG_IN),
  mergeMap((action) =>
    ajax.post(`${API_URL}/api/auth/logIn`, JSON.stringify(action.payload), { 'Content-Type': 'application/json' }).pipe(
      map(wholeRequestData => logInSuccess(wholeRequestData.token)),
      catchError(error => of(apiErrorOccurred(error)))
    )
  )
);

export default [
  logInEpic,
];