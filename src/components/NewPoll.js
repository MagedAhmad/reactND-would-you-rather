import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions';

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
        
        let first = this.state.firstOption
        let last = this.state.lastOption
        let user = this.props.authedUser[0]
        
        handleAddQuestion({first, last, user})
    }

    render() {
        const { authedUser } = this.props;
        
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