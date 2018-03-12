import React from 'react';
import store from '../../lib/store';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component{

  logout(){
    store.dispatch({type:'RESET_STATE'});
  }

  render(){
    return (
      <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-list-item"><Link to="/dashboard">Home</Link></li>
          { !localStorage.token ?
            <li className="nav-list-item"><Link to="/landing/signin">Sign in</Link></li>
            : undefined}
          { !localStorage.token ? <li className="nav-list-item"><Link to="/landing/signup">Sign up</Link></li>
            : undefined}
          { localStorage.token ? <li onClick={this.logout}><Link to="/">Sign Out</Link></li>
            : undefined}
        </ul>
      </nav>
    );
  }
}