import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
class Dashboard extends Component {
    render() {
        const { authedUser, questions, users } = this.props;
        return (
            <div>
                <Tab menu={{ pointing: true }} panes={getPanes(questions, users, authedUser)} />
            </div>
        )
    }
}

function getPanes(questions, users, authedUser){
    let aqs = getAnsweredQuestions(questions, users, authedUser)
    let uqs = getUnAnsweredQuestions(questions, users, authedUser)
    let tabs = ['answered', 'Unanswered']
    return tabs.map(function(tab) {
      return {
        menuItem: tab,
        render: () =>
        <Tab.Pane attached={false}>
            {Object.keys(tab == 'answered' ? aqs : uqs).map( function(id){
              return <div key={id}>
                <p>
                <b>Author {aqs[id].author} : </b>
                <br></br>
                <label>{aqs[id].optionOne.text}</label>
                <input type="radio" name={id} value={aqs[id].optionOne.text}/>
                <br></br>
                <label>{aqs[id].optionTwo.text}</label>
                <input type="radio" name={id} value={aqs[id].optionTwo.text}/>
                </p>
              </div>
            })}
            </Tab.Pane>
      }
    }) 
}

function getAnsweredQuestions(questions, users, authedUser) {
  const answeredIds = Object.keys(users[authedUser[0]].answers);

  return Object.values(questions)
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
}

function getUnAnsweredQuestions(questions, users, authedUser) {
  const answeredIds = Object.keys(users[authedUser[0]].answers);

  return Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
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