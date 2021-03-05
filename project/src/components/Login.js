import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import LoadingBar  from 'react-redux-loading'
import { Container, Header, Form } from 'semantic-ui-react';

class Login extends Component {
  state = {
    user: '',
  };

  handleLogin = e => {
    const user = e.target.value;

    this.setState({ user });
  };

  submitForm = e => {
    e.preventDefault()

    this.props.dispatch(setAuthedUser([this.state.user]));
  }

  render() {
    let {users}  = this.props;
        return (
          <Container>
            <form action="post" onSubmit={this.submitForm}>
              <LoadingBar />
              <Header as="h1" color="red">
                Login
              </Header>
              
              <select onChange={this.handleLogin}>
                <option>Select user</option>
                {Object.keys(users).map((id) => (
                  <option key={id} value={id}>
                    {users[id].name}
                  </option>
                ))}
              </select>
              <input type="submit" value="Submit" />
            </form>
          </Container>
        );
      }
}

const mapStateToProps = ({ users, setAuthedUser }) => {
  return { 
    users, 
    setAuthedUser 
  };
};


export default connect(mapStateToProps)(Login);