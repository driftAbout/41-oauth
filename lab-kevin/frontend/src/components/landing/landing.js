import React from 'react';
import {connect} from 'react-redux';
import {signInRequest, signUpRequest, createProfileRequest, getProfileRequest, getUserPhotosRequest} from '../../actions';
import {SignForm} from '../sign';


class Landing extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    
    let {params} = this.props.match;
    
    let onComplete = {
      login: params.sign === 'signin' ? this.props.signin : this.props.signup,
      getProfile: params.sign === 'signin' ?  this.props.getProfileRequest : this.props.createProfileRequest,
      getUserPhotos: this.props.getUserPhotos,
    };
  
    return (
      <section className="landing-container">
        <h2>All the World&apos;s a Stage<span>--William Shakespeare</span></h2>
        <SignForm sign={params.sign}
          onComplete={onComplete}
        />
      </section>

    );
  }
}


const mapDispatchToProps = dispatch => ({
  signin: user => dispatch(signInRequest(user)),
  signup: user => dispatch(signUpRequest(user)),
  createProfileRequest: token => dispatch(createProfileRequest(token)),
  getProfileRequest: token => dispatch(getProfileRequest(token)),
  getUserPhotos: () => dispatch(getUserPhotosRequest()),
});

export default connect(null, mapDispatchToProps)(Landing);

