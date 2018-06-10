import axios from 'axios';
import {apiKey} from '../constants';

export const doGet = (url, requestHeader = {}) => {
    return axios.get(url, {
        headers: {
            Authorization: apiKey,
            ...requestHeader
        }
    })
};
