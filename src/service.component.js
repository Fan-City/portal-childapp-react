import { SERVICEID } from './config.js'
import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import Subroute1 from './subroute1.component.js'
import Subroute2 from './subroute2.component.js'
import './app.css';

export default class Root extends React.Component {
  render () {
    return (
      <Router basename={'/' + SERVICEID}>
        <div className="App">
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className='App-link'
              href='https://reactjs.org'
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn React
            </a>
          </header>
          <Route path='/normal' component={Subroute1} />
          <Route path='/processing' component={Subroute2} />
        </div>
      </Router>
    )
  }
}
