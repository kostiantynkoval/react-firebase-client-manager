import React, {Component} from 'react';
import PropTypes from 'prop-types';import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Notification from '../layout/Notification'
import { showNotification, hideNotification } from "../../store/actions/index";


class Register extends Component {

    constructor(props) {
        super(props)
        const { history: { push }, settings: { allowRegistration } } = props
        if(!allowRegistration) {
            push('/')
        }
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { email, password, confirmPassword} = this.state
        if(password === confirmPassword) {
            const { firebase, showNotification } = this.props
            // Firebase register
            firebase
                .createUser({ email, password })
                .catch(err => showNotification(err.message, 'error'))
        } else {
            const { showNotification } = this.props
            showNotification('Password and Confirm password don\'t match', 'error')
        }


    }

    getSnapshotBeforeUpdate(prevProps) {
        if(prevProps.notify.message === null && this.props.notify.message !== null) {
            return 'set_hiding_timeout'
        }
        return null
    }

    componentDidUpdate(p, s, snaphot) {
        if (snaphot === 'set_hiding_timeout') {
            this.timeout = setTimeout(this.hideTimeout.bind(this), 3000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    hideTimeout = () => {
        this.props.hideNotification()
    }

    render() {
        const { message, messageType } = this.props.notify
        const { email, password, confirmPassword } = this.state
        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-block">
                            {
                                message !== null && <Notification messageType={messageType} message={message} />
                            }
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock" />
                                    {' '}Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        required
                                        value={confirmPassword}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    showNotification: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired
};

export default compose(
    firebaseConnect(),
    connect(
        state => ({
            notify: state.notify,
            settings: state.settings
        }),
        {
            showNotification,
            hideNotification
        }
    )
)(Register);