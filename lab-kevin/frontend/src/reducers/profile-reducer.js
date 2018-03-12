export default (state={}, action) => {
  let {type, payload} = action;

  const takeAction = {};

  takeAction['PROFILE_SET'] = payload => payload;

  takeAction['SET_STATE'] = storage => storage.profile;
   
  takeAction['RESET_STATE'] = () => ({});
  
  return takeAction[type] ? takeAction[type](payload) : state;
 
};