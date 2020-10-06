import { combineReducers } from 'redux';

import user from './userReducer';
import loading from './loadingReducer';

const rootReducer = combineReducers({ user, loading });

export default rootReducer;
