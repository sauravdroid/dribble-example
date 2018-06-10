import * as React from 'react';
import axios from 'axios';
import {dribbleUrl, apiKey} from '../constants';

export class ShotsList extends React.Component {
    constructor() {
        super();
        this.state = {
            shots: []
        };
    }

    componentWillMount() {
        this.getIcons();
    }

    getIcons = () => {
        axios.get(`${dribbleUrl}/shots`, {
            headers: {
                Authorization: apiKey,
            }
        })   
        .then(response => {
            this.setState({shots: response.data});
        })
        .catch(error => {
            console.log(`Error occured ${error}`);
        });
    }

    renderIcons = () => {
        const {shots = []} = this.state;

        return shots.map((item, index) => {
            const {title, images, id} = item;

            return (
                <li key={index}>
                    <h4>{title}</h4>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Shots</h2>
                <ul>
                    {this.renderIcons()}
                </ul>
            </div>
        );
    }
}