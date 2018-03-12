import './_settings.scss';
import React from 'react';
import {Profile} from '../profile';
import {PhotoUpload} from '../photo-upload';
import {connect} from 'react-redux';
import {updateProfileRequest, photoCreateRequest} from '../../actions';

class Settings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      settings_view: 'profile-view',
    };
    this.toggleSettingsTabs = this.toggleSettingsTabs.bind(this);
  }

  toggleSettingsTabs(e){
    this.setState({settings_view: e.target.className});
  }

  render(){
    return (
      <section className="settings-container">
        <div onClick={this.toggleSettingsTabs} className="settings-form-toggle">
          <span className="profile-view" >Profile</span>
          <span className="photo-upload-view">Photo Upload</span>
        </div>
        { this.state.settings_view === 'profile-view' ? 
          <Profile onComplete={this.props.onComplete}
            profile={this.props.profile}/>
          :
          <PhotoUpload onComplete={this.props.photoUpload}
            profile={this.props.profile} /> 
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  photoUpload: photo => dispatch(photoCreateRequest(photo)),
  onComplete:{
    profile: profile => dispatch(updateProfileRequest(profile)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);