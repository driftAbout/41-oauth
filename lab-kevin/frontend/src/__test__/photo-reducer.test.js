import photoReducer from '../reducers/photo-reducer';

describe('Profile Reducer Test', function(){
 
  describe('PROFILE_SET Test', () => {

    beforeAll(() => {

      this.payload = 
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'crows',
          __v:0,
        };
    

      this.action = {
        type: 'PHOTO_CREATE',
        payload: this.payload , 
      };
      
      this.createPhoto = photoReducer([], this.action);
    });
    
    it('Should set the state to the profile sent', () => {
      expect(this.createPhoto).toBeInstanceOf(Array);
      expect(this.createPhoto).not.toBeNull();
    });

    it('Should contain an array with an object the data that was sent', () => {
      expect(this.createPhoto[0]._id).toEqual('5aa5c976d52f8f0f24ae54af');
    });
  });

  describe('PHOTO_DELETE Test', () => {

    this.payload = [
      {
        comments:[], 
        _id: '5aa5c976d52f8f0f24ae54af',
        owner: '5aa5a327d52f8f0f24ae54ad',
        profile:{
          _id: '5aa5a327d52f8f0f24ae54ae',
          owner: '5aa5a327d52f8f0f24ae54ad',
          username: 'kevin',
          email: 'kevin@',
          bio: 'me',
          __v: 0,
          avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
        },
        url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
        description: 'crows',
        __v:0,
      },
    ];

    beforeAll(() => {
      this.action = {
        type: 'PHOTO_DELETE',
        payload: this.payload,
      };
      this.deletePhoto = photoReducer(this.payload, this.action);
    });
  
    it('Should return an empty state array', () => {
      expect(this.deletePhoto.length).toEqual(0);
    });
  });

  describe('PHOTO_UPDATE Test', () => {
    beforeAll(() => {
      this.payload = [
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'crows',
          __v:0,
        },
      ];

      this.payload_update = 
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'Pure Imagination',
          __v:0,
        };

      this.action = {
        type: 'PHOTO_UPDATE',
        payload: this.payload_update,
      };
      this.photoUpdate = photoReducer(this.payload, this.action);
    });
  
    it('Should return an array with an updated description', () => {
      expect(this.photoUpdate[0].description).toEqual('Pure Imagination');
    });
  });

  describe('PHOTOS_SET Test', () => {
    beforeAll(() => {
      this.photosState = [
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'crows',
          __v:0,
        },
      ];

      this.payload = 
      [
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'Pure Imagination',
          __v:0,
        },
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg',
          description: 'Pure Imagination',
          __v:0,
        },
      ];

      this.action = {
        type: 'PHOTOS_SET',
        payload: this.payload,
      };
      this.photosSet = photoReducer(this.photosState, this.action);
    });
  
    it('Should return an array a length of three', () => {
      expect(this.photosSet.length).toEqual(3);
    });
  });


  describe('RESET_STATE Test', () => {

    this.payload = [
      {
        comments:[], 
        _id: '5aa5c976d52f8f0f24ae54af',
        owner: '5aa5a327d52f8f0f24ae54ad',
        profile:{
          _id: '5aa5a327d52f8f0f24ae54ae',
          owner: '5aa5a327d52f8f0f24ae54ad',
          username: 'kevin',
          email: 'kevin@',
          bio: 'me',
          __v: 0,
          avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
        },
        url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg,description:crows',__v:0,
      },
    ];

    beforeAll(() => {
      this.action = {
        type: 'RESET_STATE',
      };
      this.resetState = photoReducer(this.payload, this.action);
    });
  
    it('Should return an empty state array', () => {
      expect(this.resetState.length).toEqual(0);
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.payload = [
        {
          comments:[], 
          _id: '5aa5c976d52f8f0f24ae54af',
          owner: '5aa5a327d52f8f0f24ae54ad',
          profile:{
            _id: '5aa5a327d52f8f0f24ae54ae',
            owner: '5aa5a327d52f8f0f24ae54ad',
            username: 'kevin',
            email: 'kevin@',
            bio: 'me',
            __v: 0,
            avatar: 'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
          },
          url: 'https://401d21-38.s3.us-west-2.amazonaws.com/a8856020b5846d176c43784dbcf75e4f.crow_sky2.jpg,description:crows',__v:0,
        },
      ];

      this.action = {
        type: 'SET_STATE',
        payload: {photos: this.payload},
      };

      this.setState = photoReducer([], this.action);
    });
    
    it('Should return a state object with the values sent', () => {
      expect(this.setState).toBeInstanceOf(Array);
      expect(this.setState[0]._id).toEqual('5aa5c976d52f8f0f24ae54af');
    });
  });

});