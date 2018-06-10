import * as React from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Input, Button, Card, Tabs, Select} from 'antd';
import {updatePostForm, addPost} from '../../actions/postAction';
import {helloSelector, byeSelector, sayonaraSelector} from '../../selectors/postSelectors';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PostFormImpl extends React.Component {

    constructor() {
        super();
        this.state = {
            searchInput: ''
        }
    }

    onChange = (e) => {
        this.props.updatePostForm({
            [e.target.id]: e.target.value   
        });
    }

    onChangeSearch = (e) => {
        this.setState({
            searchInput: e.target.value
        });
        const api_key = 'AIzaSyAdMGtUFm3jBS-sKB5K1BgXjH1UDpiY0PM';
        const url = `https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=${api_key}&input=${this.state.searchInput}`;
        axios.get(url)
        .then((response) => {
            console.log(response.data.predictions);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    addPost = () => {
        const post = this.props.posts.get('formData');
        this.props.addPost(post);
    }

    renderPosts = () => {
        const posts = this.props.posts.get('postList').toJS();
        
        return posts.map((item, index) => {
            const {author, title} = item;

            return (
                <Card style={{width:600}} key={index}>
                    <h4>{title}</h4>
                    <h5>{author}</h5>
                </Card>
            );
        });
    }

    renderFilteredPosts = (posts) => {
        return posts.map((item, index) => {
            const {author, title, tags} = item;

            return (
                <Card style={{width:600}} key={index}>
                    <h4>{title}</h4>
                    <h5>{author}</h5>
                    <h5>{tags}</h5>
                </Card>
            );
        });
    }

    handleSelectChange = (value) => {
        this.props.updatePostForm({
            tags: value
        });
    }

    render() {
        const {posts} = this.props;
        const {title, author} = posts.get('formData').toJS();

        return (
            <div>
                <Card style={{width: 800}}>
                    <Input style={{marginBottom: 20}} onChange={this.onChangeSearch} value={this.state.searchInput} type="text" id="title" placeholder="Title" />
                    <Input style={{marginBottom: 20}} onChange={this.onChange} value={title} type="text" id="title" placeholder="Title" />
                    <Input onChange={this.onChange} value={author} type="text" id="author" placeholder="Author"/>
                    <Select defaultValue='Hello' style={{width: 120}} onChange={this.handleSelectChange}>
                        <Option value="Hello">Hello World</Option>
                        <Option value="Bye">Good Bye</Option>
                        <Option value="Sayonara">Sayonara Bro</Option>
                    </Select>
                    <Button style={{marginTop: 20}} type="primary" onClick={this.addPost}>Create Post</Button>
                </Card>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Hello Posts" key="1">
                        {this.renderFilteredPosts(this.props.helloPosts)}
                    </TabPane>
                    <TabPane tab="Bye Posts" key="2">
                        {this.renderFilteredPosts(this.props.byePosts)}
                    </TabPane>
                    <TabPane tab="Sayonara Posts" key="3">
                        {this.renderFilteredPosts(this.props.sayonaraPosts)}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        helloPosts: helloSelector(state),
        byePosts: byeSelector(state),
        sayonaraPosts: sayonaraSelector(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostForm: data => {
            dispatch(updatePostForm(data));
        },
        addPost: data => {
            dispatch(addPost(data))
        }
    }
}

export const PostForm = connect(mapStateToProps, mapDispatchToProps)(PostFormImpl);