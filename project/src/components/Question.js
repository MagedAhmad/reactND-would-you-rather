import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Image  } from 'semantic-ui-react'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Poll from './Poll'

class Question extends Component {
    
    render() {
        const { authedUser, questions, users, id } = this.props;

        return (
            <div>
                <Link to={`questions/${id}`}>
                    <Card key={id}>
                        <Card.Content>
                            <Image
                            floated='right'
                            size='mini'
                            src={users[questions[id].author].avatarURL}
                            />
                            <Card.Header>{questions[id].author}</Card.Header>
                            <Card.Meta>{new Date(questions[id].timestamp * 1000).toLocaleDateString("en-US")}</Card.Meta>
                            <Card.Description>
                            Would You  <strong>Rather</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                            <Button basic color='green'>
                                {questions[id].optionOne.text}
                            </Button>
                            <Button basic color='red'>
                                {questions[id].optionTwo.text}
                            </Button>
                            </div>
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}) {
    return {
        authedUser,
        questions,
        users
    }
}

export default connect(mapStateToProps)(Question)