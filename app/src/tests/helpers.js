import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import {StaticRouter, MemoryRouter, Route} from 'react-router-dom'

var Helpers = Helpers || {};

Helpers.fake_Language = {
  "test": {
    message: "Hola",
  }
};

Helpers.wait = async (time)=>{
  new Promise((res, rej)=>{
    setTimeout(res, time);
  })
}

Helpers.instanciateApp = function() {
  const div = document.createElement('div');
  const context = {};

  let app;
  const createApp = (props)=>{
    return (
      <App
        {...props}
        ref={(tt)=> {
          app = tt;
        }}
      />
    );
  }

  ReactDOM.render(
    <StaticRouter
      location={"/translate-web-extension"}
      context={context}
    >
      <Route path="/translate-web-extension" render={createApp}/>
    </StaticRouter>, div);

  return [app, div];
}

Helpers.closeApp = function(el) {
  ReactDOM.unmountComponentAtNode(el);
}


export default Helpers;
