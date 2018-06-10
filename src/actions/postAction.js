import {UPDATE_POST_FORM, ADD_POST} from '../constants';

export const updatePostForm = payload => {
    return {
        type: UPDATE_POST_FORM,
        payload
    }
};

export const addPost = payload => {
    return {
        type: ADD_POST,
        payload
    };
}