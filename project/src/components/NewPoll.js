import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'

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
    handleOptionTwo= (e) => {
        e.preventDefault();
        this.setState({
            lastOption : e.target.value
        })
    };
    handleNewPoll= (e) => {
        e.preventDefault()
        if(this.state.firstOption !== null && this.state.lastOption === null) {
            // Submit poll question
        }
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
                    <input placeholder='Last Option' onChange={this.handleOptionTwo} />
                </Form.Field>
                <Button type='submit' onClick={handleNewPoll}>Add Question</Button>
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