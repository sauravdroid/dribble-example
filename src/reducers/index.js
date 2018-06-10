import {combineReducers} from 'redux';
import {itemReducer} from './itemReducer';
import {postReducer} from './postReducer';

export const allReducers = combineReducers({
    items: itemReducer,
    posts: postReducer
});