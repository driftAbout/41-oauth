import profileReducer from '../reducers/profile-reducer';

describe('Profile Reducer Test', function(){
 
  describe('PROFILE_SET Test', () => {

    beforeAll(() => {

      this.payload = {
        _id: '5aa5a327d52f8f0f24ae54ae',
        owner: '5aa5a327d52f8f0f24ae54ad',
        username: 'kevin',
        email: 'kevin@yomamma.com',
        bio: 'me',
        __v :0,
        avatar:  'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
      };

      this.action = {
        type: 'PROFILE_SET',
        payload: this.payload , 
      };
      
      this.setProfile = profileReducer({}, this.action);
    });
    
    it('Should set the state to the profile sent', () => {
      expect(this.setProfile).toBeInstanceOf(Object);
      expect(this.setProfile).not.toBeNull();
    });

    it('Should contain profile object with the data that was sent', () => {
      expect(this.setProfile._id).toEqual('5aa5a327d52f8f0f24ae54ae');
    });
  });

  describe('RESET_STATE Test', () => {

    this.payload = {
      _id: '5aa5a327d52f8f0f24ae54ae',
      owner: '5aa5a327d52f8f0f24ae54ad',
      username: 'kevin',
      email: 'kevin@yomamma.com',
      bio: 'me',
      __v :0,
      avatar:  'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
    };

    beforeAll(() => {
      this.action = {
        type: 'RESET_SET',
      };
      this.resetState = profileReducer(this.payload, this.action);
    });
  
    it('Should return an empty state object', () => {
      expect(this.resetState).toBeNull;
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.payload = {
        _id: '5aa5a327d52f8f0f24ae54ae',
        owner: '5aa5a327d52f8f0f24ae54ad',
        username: 'kevin',
        email: 'kevin@yomamma.com',
        bio: 'me',
        __v :0,
        avatar:  'https://401d21-38.s3.us-west-2.amazonaws.com/8d7793192c77a8d506049c0783b4d575.Photo%20on%202-4-18%20at%201.46%20PM%20%232.jpg',
      };

      this.action = {
        type: 'SET_STATE',
        payload: {profile: this.payload},
      };

      this.setState = profileReducer({}, this.action);
    });
    
    it('Should return a state object with the values sent', () => {
      expect(this.setState).toBeInstanceOf(Object);
      expect(this.setState._id).toEqual('5aa5a327d52f8f0f24ae54ae');
    });
  });

});