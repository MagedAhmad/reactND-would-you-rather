import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Tab, Card  } from 'semantic-ui-react'
import Question from "./Question";
class Dashboard extends Component {
    
    render() {
        const { authedUser, questions, users } = this.props;
        return (
            <Fragment>
                <Tab menu={{ pointing: true }} panes={getPanes(questions, users, authedUser)} />
            </Fragment>
        )
    }
}

function getPanes(questions, users, authedUser){
    let aqs = getAnsweredQuestions(questions, users, authedUser)
    let uqs = getUnAnsweredQuestions(questions, users, authedUser)
    let tabs = ['Unanswered', 'answered']

    return tabs.map(function(tab) {
      let qs =  tab == 'answered' ? aqs : uqs
      return {
        menuItem: tab,
        render: () =>
        <Tab.Pane attached={false}>
            {Object.keys(qs).map( function(id){
              {id !== null
              return <Card.Group key={id}>
                <Question id={qs[id].id}></Question>
            </Card.Group>
            }})}
            </Tab.Pane>
      }
    }) 
}

function getAnsweredQuestions(questions, users, authedUser) {
  const answeredIds = Object.keys(users[authedUser[0]].answers);

  return Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
}

function getUnAnsweredQuestions(questions, users, authedUser) {
  const answeredIds = Object.keys(users[authedUser[0]].answers);

  return Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
}

function mapStateToProps({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Dashboard)