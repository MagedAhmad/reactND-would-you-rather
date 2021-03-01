import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'

class Dashboard extends Component {
    render() {
        
        const { authedUser, questions, users } = this.props;
        return (
            <div>
                <Tab menu={{ pointing: true }} panes={getPanes(questions, users, authedUser)[0]} />
            </div>
        )
    }
}

function getPanes(questions, users, authedUser){
    let tabs = ['answered', 'unanswered'];
    return Object.keys(tabs).map( function(item){
      let qs = getQuestions(item, questions, users, authedUser)
      return Object.keys(qs).map( function(id){
        return {
          menuItem: id,
          render: () =>
            <Tab.Pane attacched="false">
              <div>
                <p>
                <b>Author {qs[id].author} : </b>
                <br></br>
                <label>{qs[id].optionOne.text}</label>
                <input type="radio" name={id} value={qs[id].optionOne.text}/>
                <br></br>
                <label>{qs[id].optionTwo.text}</label>
                <input type="radio" name={id} value={qs[id].optionTwo.text}/>
                </p>
              </div>
            </Tab.Pane>
        }
      })
    })
}

function getQuestions(item, questions, users, authedUser) {
  const answeredIds = Object.keys(users[authedUser[0]].answers);
  if(item === 'answered') {
    return  Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  }else {
    return Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  }
}

function mapStateToProps({authedUser, users, questions}) {
    return {
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Dashboard)