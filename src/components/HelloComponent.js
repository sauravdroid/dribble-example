import * as React from 'react';
import {connect} from 'react-redux';

class HelloComponentImpl extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            age: 0
        };
    }

    renderItems = () => {
        const {items} = this.props || [];
        
        return items.map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.name}</span>
                    <span>{item.age}</span>
                </li>
            );
        });
    }

    onChange = e => {
        console.log(this.state);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClick = () => {
        this.props.addItem({
            type: "ADD_ITEM",
            payload: this.state
        })
    }

    render() {
        return (
            <div>
                <h1>Hey this is the hello world component</h1>
                <input onChange={this.onChange} id='name' value={this.state.name} />
                <input onChange={this.onChange} id='age' value={this.state.age} />
                <button onClick={this.handleClick}>Add User</button>
                {this.renderItems()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItem: (item) => {
            dispatch(item);
        }
    }
}

export const HelloComponent = connect(mapStateToProps, mapDispatchToProps)(HelloComponentImpl);
