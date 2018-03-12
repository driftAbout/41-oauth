import superagent from 'superagent';

const profileSet = profile => ({type: 'PROFILE_SET', payload: profile});


const getProfileRequest = token => dispatch => {
  return  superagent.get(`${__API_URL__}/profiles/me`)
    .set({'Authorization': `Bearer ${token}`})
    .then(res => dispatch(profileSet(res.body)));
};

const createProfileRequest = token => dispatch => {
  return  superagent.post(`${__API_URL__}/profiles`)
    .set({'Authorization': `Bearer ${token}`})
    .send({bio: ''})
    .then(res => dispatch(profileSet(res.body)));
};
  
const updateProfileRequest = profile => dispatch => {
  let {file, bio, _id} = profile;
  let token = localStorage.token;
  return  superagent.put(`${__API_URL__}/profiles/${_id}`)
    .set({'Authorization': `Bearer ${token}`})
    .field('bio', bio)
    .attach('avatar', file)
    .then(res => dispatch(profileSet(res.body)));
};
    
    

  

export {profileSet, createProfileRequest, getProfileRequest, updateProfileRequest};