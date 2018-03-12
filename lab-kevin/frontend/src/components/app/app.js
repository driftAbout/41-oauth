import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import store from '../../lib/store';
import {Provider} from 'react-redux';
import {Landing} from '../landing';
import {Dashboard} from '../dashboard';
import {setStateFromStorage} from '../../actions';
import {Header} from '../header';
import {Footer} from '../footer';
import {saveToLocalStorage} from '../../lib/local-storage'; 

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default class App extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let state = store.getState();
    if(!state.token && localStorage.token) store.dispatch(setStateFromStorage());
  }
  
  render(){
    let {token} = store.getState();
    return (
      <Provider store={store}>
        <React.Fragment>
          <Header />
          <main>
            <Route exact path="/" component={() => 
              <Redirect to="/dashboard" />
            }/>
            <Route exact path="/landing/:sign" component={Landing} />
            <Route exact path="/dashboard" component={() => 
              token ?
                <Dashboard token={token} />
                : <Redirect to="/landing/signup" />
            }/>
          </main>
          <Footer />
        </React.Fragment>  
      </Provider>
    );
  }
}