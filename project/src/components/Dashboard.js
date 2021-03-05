import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Button, Card, Image  } from 'semantic-ui-react'
import Navbar from "./Navbar";
import Question from "./Question";
import { BrowserRouter, Link } from "react-router-dom";

class Dashboard extends Component {
    
    render() {
        const { authedUser, questions, users } = this.props;
        return (
            <Container>
                <BrowserRouter>
                  <Navbar />
                  <Tab menu={{ pointing: true }} panes={getPanes(questions, users, authedUser)} />
                </BrowserRouter>
            </Container>
        )
    }
}

function showQuestion(e, questionId) {
  let path = `/questions/`+questionId;
  this.props.history.push(path);
}

const card = (aqs, users, id) => (
    <Card key={id} onClick={(e) => showQuestion(e, id)}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={users[aqs[id].author].avatarURL}
        />
        <Card.Header>{aqs[id].author}</Card.Header>
        <Card.Meta>{new Date(aqs[id].timestamp * 1000).toLocaleDateString("en-US")}</Card.Meta>
        {/* <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description> */}
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Link to={"/questions/" + aqs[id].id} >
            <Button basic color='green'>
                {aqs[id].optionOne.text}
            </Button>
          </Link>
          <Link to={"/questions/" + aqs[id].id} >
            <Button basic color='red'>
              {aqs[id].optionTwo.text}
            </Button>
          </Link>
        </div>
      </Card.Content>
    </Card>
)

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
                {card(qs, users, id)}
            </Card.Group>
            }})}
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