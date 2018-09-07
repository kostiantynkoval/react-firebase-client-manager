import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Loading from '../layout/Loading'


class EditClient extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }

    render() {

        const { client } = this.props

        if(client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" />{' '}
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">Add Client</div>
                        <div className="card-block">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        minLength={2}
                                        required
                                        onChange={this.onChange}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        minLength={2}
                                        required
                                        onChange={this.onChange}
                                        value={this.state.lastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        minLength={2}
                                        onChange={this.onChange}
                                        value={this.state.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        minLength={10}
                                        required
                                        onChange={this.onChange}
                                        value={this.state.phone}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="balance">Balance</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="balance"
                                        onChange={this.onChange}
                                        value={this.state.balance}
                                    />
                                </div>

                                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                            </form>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loading/>
        }
    }
}

EditClient.propTypes = {
    clients: PropTypes.array,
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: {ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(EditClient);
