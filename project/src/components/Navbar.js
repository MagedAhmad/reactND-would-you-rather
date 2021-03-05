import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
    render() {
        const { authedUser } = this.props;
        return (
            <Menu secondary>
                <Menu.Item
                name='Dashboard'
                />
                <Menu.Item
                name='LeaderBoard'
                />
                <Menu.Item
                name='Create a Poll'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                    name={authedUser[0]}
                    />
                    <Menu.Item
                        name='logout'
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Navbar)