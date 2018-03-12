import './_profile.scss';
import React from 'react';

const fileToDataURL = file => {
  return new Promise((resolve,reject) => {
    if(!file) return reject(new Error('File is required'));
    let file_reader = new FileReader();
    file_reader.addEventListener('load', () => resolve(file_reader.result));
    file_reader.addEventListener('error', reject);
    return file_reader.readAsDataURL(file);
  });
};

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {...this.props.profile, edit_settings: false, edit_profile: false } || {
      username: '',
      email: '',
      bio: '',
      avatar: '',
      file: null,
      edit_settings: false,
      edit_profile: false,
    };

    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
    this.handleImgClick = this.handleImgClick.bind(this);
    this.clearForm = this.clearForm.bind(this);

  }

  toggleEdit(e){
    let edit_toggle = e.target.getAttribute('data-edit');
    this.setState({[edit_toggle]: !this.state[edit_toggle]});
  }

  clearForm(e){
    this.toggleEdit(e);
    this.setState({ avatar_preview: '', avatar: this.props.profile.avatar, bio: this.props.profile.bio});
  }

  handleImgClick(e){
    this.toggleEdit(e);
  }

  handleChange(e){
    if(e.target.type!== 'file') return this.setState({[e.target.name]: e.target.value});
    
    fileToDataURL(e.target.files[0])
      .then(avatar_preview => this.setState({avatar_preview}))
      .catch(console.error);
    this.setState({file: e.target.files[0]});
  }
    

  handleSubmit(e){
    e.preventDefault();
    return this.props.onComplete[e.target.name](this.state)
      .then(action => {
        let {bio, avatar} = action.payload;
        this.setState({ edit_settings: false, edit_profile: false, avatar_preview: false, bio: bio, avatar: avatar});
      });
  }

  render(){
    return (
      <div className='profile-form-container'>
        <form name="profile" className={`user-profile-form${this.state.edit_profile ? ' edit' : ''}`} onSubmit={this.handleSubmit}>
          <div data-edit="edit_profile" onClick={this.handleImgClick}>
            <input type='file' 
              name='avatar'
              id="avatar-upload"
              onChange={this.handleChange}/>
            <label htmlFor="avatar-upload"  >
              <div className="avatar-upload-wrap" >
                {this.state.avatar || this.state.avatar_preview ? <img className="avatar-image" src={this.state.avatar || this.state.avatar_preview} /> : undefined}
                <span>Upload Profile Image</span> 
              </div>
            </label>
          </div>
        
          <textarea data-edit="edit_profile" name="bio" value={this.state.bio}
            onDoubleClick={this.toggleEdit}
            placeholder='Tell me something about yourself' 
            onChange={this.handleChange}> 
          </textarea>
          <div className="button-wrap">
            { this.state.edit_profile ? 
              <span>
                <button type="button" data-edit="edit_profile" onClick={this.toggleEdit}>cancel</button>
                <button type="submit" >submit</button>
              </span> : 
              <span data-edit="edit_profile"onClick={this.toggleEdit}>edit</span>}
          </div>
        </form>

        <form name="settings" className={`user-settings-form${this.state.edit_settings ? ' edit' : ''}`}>
          <input name="username" 
            type="text" 
            placeholder="Username"
            onChange={this.handleChange} 
            value={this.state.username} /> 

          <input name="email" 
            type="email" 
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email} /> 

          <div className="button-wrap">
            { this.state.edit_settings ? 
              <span>
                <button type="button" data-edit="edit_settings" onClick={this.clearForm}>cancel</button>
                <button type="submit">submit</button>
              </span> : <span data-edit="edit_settings" onClick={this.toggleEdit}>edit</span>}
          </div>
        </form>
      </div>
    );
  }
   
}