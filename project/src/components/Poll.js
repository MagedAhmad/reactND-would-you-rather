import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Radio , Card, Image, Progress  } from 'semantic-ui-react'
import { handleSaveUserAnswer } from '../actions/users';

class Poll extends Component {
    saveAnswer = (e, {value}) => {
        let auth = this.props.users[this.props.authedUser[0]]

        this.props.dispatch(handleSaveUserAnswer(auth.id, this.props.match.params.id, value))
    };
    
    render() {
        const id = this.props.match.params.id
        const { questions, users, authedUser } = this.props
        const question = questions[id]

        function getAnswer() {
            if(question.optionOne.votes.includes(authedUser[0])) {
                return question.optionOne.text
            }else if(question.optionTwo.votes.includes(authedUser[0])) {
                return question.optionTwo.text
            }

            return null
        }
        
        let optionOneTimes = question.optionOne.votes.length
        let optionTwoTimes = question.optionTwo.votes.length
        let total = optionOneTimes + optionTwoTimes


        return (
            <Card key={id} style={{width: 500 + 'px', 'margin': 'auto'}}>
                <Card.Content>
                    <Image
                    floated='right'
                    size='mini'
                    src={users[question.author].avatarURL}
                    />
                    <Card.Header>{question.author}</Card.Header>
                    <Card.Meta>{new Date(question.timestamp * 1000).toLocaleDateString("en-US")}</Card.Meta>
                    <Card.Description>
                    Would You  <strong>Rather</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Form>
                        <Form.Field>
                            {getAnswer() === null ? 
                        <Radio
                            label={question.optionOne.text}
                            name='radioGroup'
                            value="optionOne"
                            checked={getAnswer() === question.optionOne.text}
                            onChange={this.saveAnswer}
                            disabled={getAnswer() !== null}
                        />: <Progress value={optionOneTimes} total={total} progress='percent' indicating>
                               
                                {
                                    getAnswer() === question.optionOne.text ? 
                                        'You answer: ' + question.optionOne.text : 
                                        question.optionOne.text
                                }
                                ({optionOneTimes} votes)
                            </Progress>
                            }
                        </Form.Field>
                        <Form.Field>
                        {getAnswer() === null ? 
                        <Radio
                            label={question.optionTwo.text}
                            name='radioGroup'
                            value="optionTwo"
                            checked={getAnswer() === question.optionTwo.text}
                            onChange={this.saveAnswer}
                            disabled={getAnswer() !== null}
                        />
                        : <Progress value={optionTwoTimes} total={total} progress='percent' indicating>
                            
                            {
                                getAnswer() === question.optionTwo.text ? 
                                    'You answer: ' + question.optionTwo.text : 
                                    question.optionTwo.text
                            }
                            ({optionTwoTimes} votes)
                            </Progress>
                        }
                        </Form.Field>
                    </Form>
                </Card.Content>
            </Card>
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

export default connect(mapStateToProps)(Poll)