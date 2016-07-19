import { combineReducers } from 'redux';
import slime from 'reducers/slime';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  slime,
  routing
});

export default rootReducer;