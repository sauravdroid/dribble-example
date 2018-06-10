import {fromJS} from 'immutable';
import {UPDATE_POST_FORM, ADD_POST} from '../constants';

const initialState = fromJS({
    formData: {
        title: '',
        author: '',
        tags: 'Hello'
    },
    postList: []
});

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POST_FORM:
            return state.mergeDeep({
                formData: {
                    ...action.payload
                }
            });
        case ADD_POST:
            return state.update('postList', posts => posts.push(action.payload))
        default: 
            return state;
    }
}