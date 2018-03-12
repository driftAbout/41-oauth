import './_photo-upload.scss';
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

export default class PhotoUpload extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      photo_preview: '',
      description: '',
      file: null,
    };

    this.clearForm = this.clearForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit =  this.handleSubmit.bind(this);
  }

  handleChange(e){
    if(e.target.type!== 'file') return this.setState({[e.target.name]: e.target.value});
    
    fileToDataURL(e.target.files[0])
      .then(photo_preview => this.setState({photo_preview}))
      .catch(console.error);
    this.setState({file: e.target.files[0]});
  }
    
  clearForm(){
    this.setState({ photo_preview: '', description: ''});
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.file || !this.state.description) return;
    return this.props.onComplete(this.state)
      .then(this.clearForm());
  }

  render(){
    return (
      <div className='photo-upload-form-container'>
        <form name="photo-upload" className="photo-upload-form" onSubmit={this.handleSubmit}>
          <div>
            <input type='file' 
              name='photo'
              id="photo-upload"
              onChange={this.handleChange}/>
            <label htmlFor="photo-upload" >
              <div className="photo-upload-wrap" >
                {this.state.photo_preview ? <img className="photo-image" src={this.state.photo_preview} /> : undefined}
                <span>Upload Image</span> 
              </div>
            </label>
          </div>
        
          <input name="description"
            type="text" 
            value={this.state.description}
            placeholder='tell me something about this image' 
            onChange={this.handleChange}/> 
          <div className="button-wrap">
            <span>
              <button type="button" name="cancel" onClick={this.clearForm}>cancel</button>
              <button type="submit" >submit</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}