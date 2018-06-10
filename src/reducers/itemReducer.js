import {fromJS, toJS} from 'immutable';
export const initialState = fromJS({
    title: '',
    isbn: '',
    series: '',
    author: {
        firstName: '',
        lastName: ''
    },
    genres: [],
    storeListings: []
});

export const itemReducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_ITEM":
            return state.push(action.payload);
        default: 
            return state;
    }
}
