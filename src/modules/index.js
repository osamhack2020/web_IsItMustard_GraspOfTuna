import { combineReducers } from "redux";

import loading from "./loading";
import authentication from './authentication';
import work from './work';
import user from './user';
const rootReducer = combineReducers({
  	loading, authentication, user, work
});

export default rootReducer;