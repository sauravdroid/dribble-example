import * as React from 'react';
import {Link} from 'react-router-dom';

export class NotFound extends React.Component {
    render () {
        return (
            <div>
                <h3>Something must be wrong. Page not found</h3>
                <Link to='/shots'>Try Here</Link>
            </div>
        );
    }
}