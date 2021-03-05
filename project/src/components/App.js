import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Container  } from 'semantic-ui-react'
import { connect } from 'react-redux'
import LoadingBar  from 'react-redux-loading'
import Login from "./Login";
import Dashboard from "./Dashboard";
import Navbar from './Navbar';
import Poll from './Poll';

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
            <Route path="/questions/:question_id" component={Poll} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <LoadingBar />
          <Container>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/questions/:id" exact component={Poll} />
            </Switch>
          </Container>
        </BrowserRouter>
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