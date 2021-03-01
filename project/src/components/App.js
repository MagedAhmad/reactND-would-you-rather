import React, { Component, Fragment } from 'react'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux'
import LoadingBar  from 'react-redux-loading'
import Login from "./Login";
import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login}  />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <LoadingBar />
        {this.props.loading === true
          ? null
          : 
          <Dashboard />
        }
      </div>
    )
  }
}


function mapStateToProps({authedUser}) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(App)