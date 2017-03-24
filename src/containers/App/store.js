import { createActions, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const actions = createActions('STORE_TOKEN');

export const reducer = combineReducers({
  auth: handleActions({
    [actions.storeToken]: (state, action) => ({ ...state, token: action.payload })
  }, { token: null })
});
