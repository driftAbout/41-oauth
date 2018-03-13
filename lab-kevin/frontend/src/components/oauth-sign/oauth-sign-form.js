import React from 'react';
import {Redirect} from 'react-router-dom';

const GOOGLE_OAUTH_ID = '193384007926-4aftelquvlg1idq3231iegde89i91na5.apps.googleusercontent.com';

const GOOGLE_OAUTH_LINK = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/api/v1/oauth/google/code&scope=openid%20email%20profile&client_id=${GOOGLE_OAUTH_ID}&prompt=consent&response_type=code`;

export default class OauthSignForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonText = this.buttonText.bind(this);

  }

  buttonText(){
    return this.props.sign === 'signup' ? 'Sign Up' : 'Sign In';
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({
      [name]: value, 
      userError: name === 'username' && !value.trim() ? 'Username required' : null,
      emailError: name === 'email' && value.trim() ? 'Email address required' : null,
      passwordError: name === 'password' && value.trim() ?  'Password required' : null,
    });
        
  }

  handleSubmit(e){
    e.preventDefault();
    let {username, email, password} = this.state;
    this.props.onComplete.login({username, email, password})
      .then(action => {
        let token = action.payload; 
        Object.keys(this.state).forEach(prop => this.setState({[prop]: ''}));
        if(!token) return;
        return this.props.onComplete.getProfile(token);
      })
      .then(() => {
        if(this.props.sign === 'signin') this.props.onComplete.getUserPhotos();
      })
      .then(() => this.setState({token: true}))
      .catch(err => this.setState({err}));
  }

  render(){
    return (

      <React.Fragment>
        {this.state.token ? <Redirect to='/dashboard' /> : undefined}
        <div className="google-oauth-wrap">
          <h3>Sign in / sign up with google</h3>
          <a href={GOOGLE_OAUTH_LINK} ><span className="google-signin-btn">google</span></a>
        </div>
        <form onSubmit={this.handleSubmit} noValidate>
          <input name="username" 
            type='text' 
            value={this.state.username} 
            placeholder='Name'
            onChange={this.handleChange}/>

          {this.props.sign === 'signup' ? 
            <input name="email" 
              type="email" 
              value = {this.state.email} 
              placeholder="Email"
              onChange={this.handleChange}/>
            : undefined}

          <input name="password" 
            type="password" 
            value ={this.state.password} 
            placeholder="Password" 
            onChange={this.handleChange}/>

          <button type="submit">{this.buttonText()}</button>
        </form>

      </React.Fragment>
    );
  }
}