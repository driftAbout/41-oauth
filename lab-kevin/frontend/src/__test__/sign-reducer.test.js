import signReducer from '../reducers/sign-reducer';

describe('Sign Reducer Test', function(){
 
  describe('TOKEN_SET Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'TOKEN_SET',
        payload: '1a2b3c4d5e6', 
      };
      
      this.setToken = signReducer('', this.action);
    });
    
    it('Should set the state to the token sent', () => {
      expect(typeof this.setToken).toEqual('string');
      expect(this.setToken).not.toBeNull();
    });

    it('Should contain an category object with the data that was sent', () => {
      expect(this.setToken).toEqual('1a2b3c4d5e6');
    });
  });

  describe('RESET_STATE Test', () => {

    beforeAll(() => {
      this.action = {
        type: 'RESET_SET',
      };
      this.resetState = signReducer('', this.action);
    });
  
    it('Should update a category and return a state object with an array of categories', () => {
      expect(this.resetState).toBeNull;
    });
  });

  describe('SET_STATE Test', () => {

    beforeAll(() => {

      this.action = {
        type: 'SET_STATE',
        payload: {token: '1a2b3c4d5e6'},
      };

      this.setState = signReducer('', this.action);
    });
    
    it('Should delete a category and return a state object without the object', () => {
      expect(typeof this.setState).toEqual('string');
      expect(this.setState).toEqual('1a2b3c4d5e6');
    });
  });

});

