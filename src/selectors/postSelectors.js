import {createSelector} from 'reselect';

const postSelector = state => state.posts.get('postList').toJS();

const getPostsHello = posts => {
    return posts.filter((post) => {
        return post.tags === 'Hello'
    });
};

const getPostsBye = posts => {
    return posts.filter((post) => {
        return post.tags === 'Bye'
    });
};

const getPostsSayonara = posts => {
    return posts.filter((post) => {
        return post.tags === 'Sayonara'
    });
};

export const helloSelector = createSelector([postSelector], getPostsHello);
export const byeSelector = createSelector([postSelector], getPostsBye);
export const sayonaraSelector = createSelector([postSelector], getPostsSayonara);