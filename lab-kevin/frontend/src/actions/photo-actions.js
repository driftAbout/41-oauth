import superagent from 'superagent';

const photoCreate = photo => ({type: 'PHOTO_CREATE', payload: photo});
const updatePhoto = photo => ({type: 'PHOTO_UPDATE', payload: photo});
const deletePhoto = photo => ({type: 'PHOTO_DELETE', payload: photo});
const setUserPhotos = photos => ({type: 'PHOTOS_SET', payload: photos});

const photoCreateRequest = photo => dispatch => {
  let token = localStorage.token;
  return  superagent.post(`${__API_URL__}/photos`)
    .set({'Authorization': `Bearer ${token}`})
    .field('description', photo.description)
    .attach('photo', photo.file)
    .then(res => dispatch(photoCreate(res.body)))
    .catch(console.error);
};

const updatePhotoRequest = photo => dispatch => {
  let token = localStorage.token;
  let {description} = photo;
  return  superagent.put(`${__API_URL__}/photos/${photo.photo_id}`)
    .set({'Authorization': `Bearer ${token}`})
    .send({description: description})
    .then(res => dispatch(updatePhoto(res.body)))
    .catch(console.error);
};

const deletePhotoRequest =  photo => dispatch => {
  let token = localStorage.token;
  return  superagent.delete(`${__API_URL__}/photos/${photo.photo_id}`)
    .set({'Authorization': `Bearer ${token}`})
    .then(() => dispatch(deletePhoto(photo)))
    .catch(console.error);
};
  
const getUserPhotosRequest =  () => dispatch => {
  let token = localStorage.token;
  return  superagent.get(`${__API_URL__}/photos/me`)
    .set({'Authorization': `Bearer ${token}`})
    .then(res => dispatch(setUserPhotos(res.body.data)))
    .catch(console.error);
};

export {photoCreate, photoCreateRequest, updatePhoto, updatePhotoRequest, deletePhoto, deletePhotoRequest, setUserPhotos, getUserPhotosRequest};