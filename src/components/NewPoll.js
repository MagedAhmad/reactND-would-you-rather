import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/shared';

class NewPoll extends Component {
    state = {
        firstOption: '',
        lastOption: ''
    }

    handleOptionOne = (e) => {
        e.preventDefault();
        this.setState({
            firstOption : e.target.value
        })
    };
    handleLastOption= (e) => {
        e.preventDefault();
        this.setState({
            lastOption : e.target.value
        })
    };
    
    handleNewPoll= (e) => {
        e.preventDefault()
        
        let optionOneText = this.state.firstOption
        let optionTwoText = this.state.lastOption
        let author = this.props.authedUser[0]

        this.props.dispatch(handleAddQuestion(optionOneText, optionTwoText, author))
    }

    render() {
        return (
            <Form>
                <h1>Would you rather ?</h1>
                <Form.Field>
                    <label>First Option</label>
                    <input placeholder='First Option' onChange={this.handleOptionOne} />
                </Form.Field>
                <Form.Field>
                    <label>Last Option</label>
                    <input placeholder='Last Option' onChange={this.handleLastOption} />
                </Form.Field>
                <Button type='submit' onClick={this.handleNewPoll}>Add Question</Button>
            </Form>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewPoll)