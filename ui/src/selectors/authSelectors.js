import { Base64 } from 'js-base64';

export const userData = (state) => {
  return Base64.decode(state.auth.token);
};

export const isLoggedIn = (state) => {
  return !!userData(state);
};