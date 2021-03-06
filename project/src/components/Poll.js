import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Radio , Card, Image  } from 'semantic-ui-react'
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

        return (
            <Card key={id}>
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
                        {getAnswer() ? ("Your answer is :" + getAnswer()) : '' }
                        </Form.Field>
                        <Form.Field>
                        <Radio
                            label={question.optionOne.text}
                            name='radioGroup'
                            value="optionOne"
                            checked={getAnswer() === question.optionOne.text}
                            onChange={this.saveAnswer}
                        />
                        </Form.Field>
                        <Form.Field>
                        <Radio
                            label={question.optionTwo.text}
                            name='radioGroup'
                            value="optionTwo"
                            checked={getAnswer() === question.optionTwo.text}
                            onChange={this.saveAnswer}
                        />
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