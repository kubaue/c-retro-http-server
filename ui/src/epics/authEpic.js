import 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { API_URL } from '../config';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { ActionType, logInFailed, logInSuccess } from "../actions/actions";
import { of } from "rxjs";
import browserHistory from '../history';

const logInEpic = (action$, state) => action$.pipe(
  ofType(ActionType.LOG_IN),
  mergeMap((action) =>
    ajax.post(`${API_URL}/login`, JSON.stringify(action.payload), { 'Content-Type': 'application/json' }).pipe(
      map(wholeRequestData => {
        browserHistory.push('/home');
        return logInSuccess(wholeRequestData.response.token);
      }),
      catchError(error => {
        console.log('error in login',  error);
        return of(logInFailed());
      })
    )
  )
);

export default [
  logInEpic,
];