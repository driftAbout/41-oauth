export default (state=null, action) => {
  let {type, payload} = action;

  let takeAction = {};
  takeAction['TOKEN_SET'] = () => payload;
 
  takeAction['SET_STATE'] = storage => storage.token;

  takeAction['RESET_STATE'] = () => null;

  return takeAction[type] ? takeAction[type](payload) : state;

};