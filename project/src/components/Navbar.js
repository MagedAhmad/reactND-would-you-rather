import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { setUserOut } from "../actions/authedUser";

class Navbar extends Component {
    
    handleLogout = (e) => {
        e.preventDefault();
        
        this.props.dispatch(setUserOut());
    };

    render() {
        const { authedUser } = this.props;
        
        return (
            <Menu secondary>
                <Menu.Item>
                    <NavLink to="/" exact activeClassName="active">
                        Dashboard
                    </NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/leaderboard" exact activeClassName="active">
                        LeaderBoard
                    </NavLink>
                </Menu.Item>
                
                <Menu.Item>
                    <NavLink to="/add" exact activeClassName="active">
                        Create a Poll
                    </NavLink>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item
                    name={authedUser[0]}
                    />
                    <Menu.Item name="Logout" onClick={this.handleLogout}/>
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Navbar)