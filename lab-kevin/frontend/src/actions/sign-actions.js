import superagent from 'superagent';

const setStateFromStorage = () => {
  
  let storage = {
    profile: localStorage.profile ? JSON.parse(localStorage.profile) : {},
    photos: localStorage.photos ? JSON.parse(localStorage.photos) : [],
    token: localStorage.token ? localStorage.profile : null,
  };

  return {
    type: 'SET_STATE',
    payload: storage,
  };
};

const tokenSet = token => {
  return {
    type: 'TOKEN_SET',
    payload: token,
  };
};

const signUpRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/signup`)
    .send(user)
    .then(res => dispatch(tokenSet(res.text)));
};

const signInRequest = user => dispatch => {
  return  superagent.get(`${__API_URL__}/login`)
    .auth(user.username, user.password)
    .then(res => dispatch(tokenSet(res.text)));
};

export  {tokenSet, signInRequest, signUpRequest, setStateFromStorage};