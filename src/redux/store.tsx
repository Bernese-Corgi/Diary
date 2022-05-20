import { Action, applyMiddleware, createStore } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './modules';
import { useDispatch } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;

export const useReduxDispatch = () => useDispatch<ReduxDispatch>();

export default store;
