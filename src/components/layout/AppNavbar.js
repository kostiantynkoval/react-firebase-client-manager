import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class AppNavbar extends Component {
    render() {
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
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

AppNavbar.propTypes = {};

export default AppNavbar;
