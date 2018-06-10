import * as React from 'react';
import * as Radium from 'radium';
import Img from 'react-image';
import {BounceLoader} from 'react-spinners';
import {doGet} from '../utils/requests';
import {dribbleUrl} from '../constants';

export class ShotComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentWillMount() {
        this.getShot();
    }

    getShot = () => {
        const url = `${dribbleUrl}/shots/${this.props.match.params.shotId}`;
        doGet(url)
        .then((response) => {
            const {title, likes_count, comments_count, created_at, rebounds_count, buckets_count, images, comments_url} = response.data;
            this.setState({
                title,
                likes_count,
                comments_count,
                created_at,
                rebounds_count,
                buckets_count,
                images
            });
            return doGet(comments_url);
        })
        .then((response) => {
            this.setState({
                ...this.state,
                comments: response.data
            });
        })
        .catch((error) => {
            console.log(error.message);
        })
    }

    renderComments = () => {
        return this.state.comments.map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.body}</span>
                    <span>{item.likes_count}</span>
                    <span>{item.user.name}</span>
                </li>
            );
        });
    }

    render () {
        const {title, likes_count, comments_count, created_at, rebounds_count, buckets_count, images} = this.state;
    
        return (
            <div style={containerStyle}>
                <h1>{title}</h1>
                {
                    images 
                    && <Img
                        src={images.normal}
                        loader={<BounceLoader color={'#36D7B7'}/>}
                    />
                }
                <ul>
                    <li>Likes {likes_count}</li>
                    <li>Comments {comments_count}</li>
                    <li>Created At {created_at}</li>
                    <li>Rebounds Count {rebounds_count}</li>
                    <li>Buckets Count {buckets_count}</li>
                </ul>
                <h3>Comments</h3>
                <ul>
                    {
                        this.state.comments && this.renderComments()
                    }
                </ul>
            </div>
        );
    }
}

const containerStyle = {
    textAlign: 'center'
}