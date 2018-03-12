import './_dashboard.scss';
import React from 'react';
import {Settings} from '../settings';
import {Gallery} from '../gallery';


export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isClosed: true,
    };

    this.toggleSettings = this.toggleSettings.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({photos: nextProps.photos});
  }
 
  toggleSettings(){
    this.setState({isClosed: !this.state.isClosed});
  }

  render(){
    return (
      <section className="dashboard">
        <h2>Take A Picture Here, Take A Souvenir<span>--R.E.M.</span></h2>
        <div className={`settings-wrap${this.state.isClosed ? ' closed' : ''}`}>  
          <span className="settings-toggle" onClick={this.toggleSettings}>{this.state.isClosed ? 'Settings' : 'close'}</span>
          <Settings />
        </div>
        <div className="gallery-wrap" >
          <Gallery />
        </div>
      </section>
    );
  }

} 