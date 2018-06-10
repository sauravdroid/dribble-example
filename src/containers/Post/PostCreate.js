import * as React from 'react';
import {PostForm} from './PostForm';

export class PostCreate extends React.Component {
    render() {
        return (
            <div>
                <h3>Enter Post Data</h3>
                <PostForm />
            </div>
        );
    }
}