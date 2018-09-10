import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class AppNavbar extends Component {

    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props

        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClick = e => {
        const { firebase } = this.props
        firebase.logout()
    }

    render() {
        const { auth } = this.props
        const { isAuthenticated } = this.state
        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary mb-4">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        ClientPanel
                    </Link>
                    <button
                        className="navbar-toggler float-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarMain">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            {
                                isAuthenticated && (
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        {
                            isAuthenticated && (
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            { auth.email }
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={this.onLogoutClick} style={{cursor: 'pointer'}} className="btn btn-secondary">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(AppNavbar);
