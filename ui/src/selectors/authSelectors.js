import { Base64 } from 'js-base64';

export const userData = (state) => {
  const token = state.auth.token;
  return token ? JSON.parse(Base64.decode(state.auth.token)) : {};
};

export const isLoggedIn = (state) => {
  const user = userData(state);
  return !!user.name;
};