import React from 'react';
import {Redirect} from 'react-router-dom';

export default class SignForm extends React.Component{
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