import { Base64 } from 'js-base64';

export const userData = (state) => {
  const token = getToken(state);
  return token ? JSON.parse(Base64.decode(state.auth.token)) : {};
};

export const isLoggedIn = (state) => {
  const user = userData(state);
  return !!user.name;
};

export const getToken = (state) => {
  return state.auth.token;
};
