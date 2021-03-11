import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Image } from 'semantic-ui-react';

class Leaderboard extends Component {

  render() {
    const { users } = this.props;
    
    function userPoints(users) {
      let scores = Object.values(users).map(user => ({
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answersCount: Object.values(user.answers).length,
          questionsCount: user.questions.length,
        }))
        .sort((a, b) => (b.answersCount + b.questionsCount) - (a.answersCount + a.questionsCount))
      
      return scores
    }


    return (
      <List relaxed>
        {userPoints(users).map((user, index) => (
        <List.Item key={index}>
          <Image avatar src={user.avatarURL} />
          <List.Content>
            <List.Header as='a'>{user.name}</List.Header>
            <List.Description>
              Answered Questions:
              <b>{user.answersCount}</b>
              <br></br>
              Questions posted:
              <b>{user.questionsCount}</b>
              {' '}
              <br></br>
              Total:
              <b>{ user.answersCount + user.questionsCount }</b>
            </List.Description>
          </List.Content>
        </List.Item>
        ))}
      </List>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}



export default connect(mapStateToProps)(Leaderboard);