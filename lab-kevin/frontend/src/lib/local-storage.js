const saveToLocalStorage = state => {
  state.photos.length ? localStorage.photos = JSON.stringify(state.photos) : delete localStorage.photos;
  Object.keys(state.profile).length ? localStorage.profile = JSON.stringify(state.profile) : delete localStorage.profile;
  state.token ? localStorage.token = state.token : delete localStorage.token;
};

export{saveToLocalStorage};