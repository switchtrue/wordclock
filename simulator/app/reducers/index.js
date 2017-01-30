// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import wordclock from './wordclock';

const rootReducer = combineReducers({
  wordclock,
  routing
});

export default rootReducer;
