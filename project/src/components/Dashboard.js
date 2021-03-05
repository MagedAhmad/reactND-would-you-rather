import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab, Button, Card, Image  } from 'semantic-ui-react'

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


const card = (aqs, users, id) => (
    <Card key={id}>
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
          <Button basic color='green'>
          {aqs[id].optionOne.text}
          </Button>
          <Button basic color='red'>
          {aqs[id].optionTwo.text}
          </Button>
        </div>
      </Card.Content>
    </Card>
)



function getPanes(questions, users, authedUser){
    let aqs = getAnsweredQuestions(questions, users, authedUser)
    let uqs = getUnAnsweredQuestions(questions, users, authedUser)
    let tabs = ['answered', 'Unanswered']

    return tabs.map(function(tab) {
      let qs =  tab == 'answered' ? aqs : uqs
      return {
        menuItem: tab,
        render: () =>
        <Tab.Pane attached={false}>
            {Object.keys(qs).map( function(id){
              return <Card.Group key={id}>
                {card(qs, users, id)}
            </Card.Group>
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