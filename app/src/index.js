import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

ReactDOM.render(
  <Router component={App}>
    <div>
      <Route path="/translate-web-extension" component={App}/>
      <Route path="*" component={()=><Redirect to="/translate-web-extension" />} />
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
