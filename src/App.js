import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {ShotsList} from './containers/ShotsList';
import {PostCreate} from './containers/Post/PostCreate';
import {WeatherSearch} from './containers/WeatherSearch';
import {NotFound, ShotComponent, HelloComponent} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
              <Route path='/hello' component = {HelloComponent} />
              <Route exact={true} path='/shots' component={ShotsList} />
              <Route path='/shots/:shotId' component={ShotComponent} />
              <Route path='/post/create' component={PostCreate} />
              <Route path='/search' component={WeatherSearch} />
              <Route component={NotFound} />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
