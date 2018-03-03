import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

ReactDOM.render(
  <Router component={App}>
    <div>
      <Switch>
        <Route path="/translate-web-extension" component={App}/>
        <Route component={()=><Redirect to="/translate-web-extension" />} />
      </Switch>
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
