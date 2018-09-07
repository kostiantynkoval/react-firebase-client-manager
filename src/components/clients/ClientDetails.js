import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import Loading from '../layout/Loading'
import classnames from 'classnames'

const BalanceForm = ({value, setNewBalance, submitNewBalance}) => (
    <form onSubmit={submitNewBalance}>
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                name="balanceUpdateAmount"
                placeholder="Add New Balance"
                value={value}
                onChange={setNewBalance}
            />
            <div className="input-group-append">
                <input type="submit" value="Update" className="btn btn-warning"/>
            </div>
        </div>
    </form>
)

class ClientDetails extends Component {

    state = {
        showBalanceUpdate: false,
        balanceUpdateAmount: null
    }

    setNewBalance = e => this.setState({ [e.target.name]: e.target.value })

    submitNewBalance = e => {
        e.preventDefault()
        const { client, firestore } = this.props
        const { balanceUpdateAmount } = this.state

        const balanceUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        }

        // Update in firestore
        firestore.update({collection: 'clients', doc: client.id}, balanceUpdate).then(() => this.setState({showBalanceUpdate: false, balanceUpdateAmount: null}))
    }

    toggleBalanceUpdate = e => {
        e.preventDefault()
        this.setState(prevState => ({showBalanceUpdate: !prevState.showBalanceUpdate}))
    }

    onDelete = () => {
        const { client, firestore, history } = this.props
        firestore.delete({collection: 'clients', doc: client.id}).then(() => history.push('/'))

    }

    render() {
        const { client } = this.props
        const { showBalanceUpdate, balanceUpdateAmount } = this.state



        if(client) {
            const classNames = classnames({
                'text-danger': client.balance > 0,
                'text-success': client.balance === 0
            })
            return (
                <Fragment>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="btn btn-link">
                                <i className="fas fa-arrow-circle-left" />{' '}
                                Back to Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group float-right">
                                <Link to={`/client/edit/${client.id}`} className="btn btn-secondary">
                                    Edit
                                </Link>
                                <button onClick={this.onDelete} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="card">
                        <h3 className="card-header">{client.firstName} {client.lastName}</h3>
                        <div className="card-block">
                            <div className="row">
                                <div className="col-md-8 col-sm-6">
                                    <h4>
                                        Client ID:{' '}
                                        <span className="text-muted">{client.id}</span>
                                    </h4>
                                </div>
                                <div className="col-md-4 col-sm-6">
                                    <h3>
                                        <small style={{cursor: 'pointer'}}>
                                            <span className="btn btn-link" onClick={this.toggleBalanceUpdate}>
                                                <i className="fas fa-pencil-alt" />
                                            </span>
                                        </small>
                                        Balance:{' '}
                                        <span className={classNames}>${parseFloat(client.balance).toFixed(2)}</span>
                                    </h3>
                                    { showBalanceUpdate && <BalanceForm
                                        value={balanceUpdateAmount}
                                        setNewBalance={this.setNewBalance}
                                        submitNewBalance={this.submitNewBalance} /> }
                                </div>
                            </div>
                            <hr/>
                            <ul className="list-group">
                                <li className="list-group-item">Contact Email: {client.email}</li>
                                <li className="list-group-item">Contact Phone: {client.phone}</li>
                            </ul>
                        </div>
                    </div>
                </Fragment>
            )
        } else {
            return <Loading/>
        }
    }
}

ClientDetails.propTypes = {
    clients: PropTypes.array,
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: {ordered}},props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);
