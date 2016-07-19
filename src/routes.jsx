import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Slime from './containers/SlimeContainer';

export default (store) => {

  return (
    <Route path="/" component={App}>
      <Route path="slime" component={Slime}/>
    </Route>
  );
};

