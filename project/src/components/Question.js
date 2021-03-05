import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        const { authedUser } = this.props;
        return (
            <div>
                <h2>Would You Rather</h2>
                
            </div>
            
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Question)