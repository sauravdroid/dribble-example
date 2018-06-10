import * as React from 'react';
import * as Radium from 'radium';
import {Link} from 'react-router-dom';
import Img from 'react-image';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';
import {SyncLoader, BounceLoader} from 'react-spinners';
import ReactPullToRefresh from 'react-pull-to-refresh';
import {doGet} from '../utils/requests';
import {dribbleUrl} from '../constants';
import logo from '../logo.svg';

class FirstComponentImpl extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                shots: [],
                showLoader: false
            };
        }
    
        componentWillMount() {
            this.getIcons();
        }

        getIcons = () => {
            const url = `${dribbleUrl}/shots`;
            this.setState({showLoader: true});
            doGet(url)
            .then((resp) => {
                const response = resp.data;
                this.setState({
                    shots: response
                });
                this.setState({showLoader: false});
            })
            .catch((err) => {
                const error = err.message;
                this.setState({showLoader: false});
            });
        }
    
        renderPictures = () => {
            const {shots} = this.state;

            if (shots) {
                return shots.map((item, index) => {
                    const {title, id, images} = item;
                    if(index % 2 == 0) {
                        return (
                            <Row>
                                <Col xs={6}>
                                    <Link to={`shots/${id}`}>
                                        <div>
                                            <h3>{title}</h3>
                                            <Img 
                                                style={imageContainer} 
                                                src={images.teaser} 
                                                loader={<SyncLoader color={'#36D7B7'} />}
                                                icon={logo}
                                            />
                                        </div>
                                    </Link>
                                </Col>
                                <Col xs={6}>
                                    <Link to={`shots/${shots[index + 1].id}`}>
                                        <div>
                                            <h3>{shots[index + 1].title}</h3>
                                            <Img 
                                                style={imageContainer} 
                                                src={shots[index + 1].images.teaser} 
                                                loader={<SyncLoader color={'#36D7B7'} />}
                                                icon={logo}
                                            />
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        );
                    }
                });
            } else {
                return <h1>No shots avaialable</h1>;
            }
        }

        refreshIcon = () => {
            return (
                <img src={logo} style={{width:'45px'}}/>
            );
        }
    
        render () {
            return (
                <div>  
                    <div style={headerContainer}>
                        <h1>Shots</h1>
                    </div>  
                    {this.renderPictures()}
                </div>
            );
        }
    }

    export const  FirstComponent = Radium(FirstComponentImpl);
    const headerContainer = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '20px'
    };
    
    const contentContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center'
    };
    
    const imageContainer = {
        width: '95%',
        borderRadius: '6px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
    };
    