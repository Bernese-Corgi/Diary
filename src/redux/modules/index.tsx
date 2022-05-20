import { combineReducers } from 'redux';
import diaryReducer from './diary';

const rootReducer = combineReducers({
  diary: diaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
