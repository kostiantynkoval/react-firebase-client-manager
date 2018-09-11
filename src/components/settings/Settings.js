import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit } from '../../store/actions'

class Settings extends Component {

    setAllowRegistration = () => {
        const { setAllowRegistration } = this.props
        setAllowRegistration()
    }
    setDisableBalanceOnAdd = () => {
        const { setDisableBalanceOnAdd } = this.props
        setDisableBalanceOnAdd()
    }
    setDisableBalanceOnEdit = () => {
        const { setDisableBalanceOnEdit } = this.props
        setDisableBalanceOnEdit()
    }


    render() {
        const { settings: {
                disabledBalanceOnAdd,
                disabledBalanceOnEdit,
                allowRegistration
            } } = this.props
        return (
            <div className="row">
                <div className="col-md-6">
                    <Link className="btn btn-link" to="/">
                        <i className="fas fa-arrow-circle-left" />
                        {' '}Back to Dashboard
                    </Link>
                </div>

                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Edit Settings</div>
                        <div className="card-block">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="allowRegistration">Allow Registration</label>{' '}
                                    <input
                                        type="checkbox"
                                        name="allowRegistration"
                                        checked={!!allowRegistration}
                                        onChange={this.setAllowRegistration}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="disabledBalanceOnAdd">Disable Balance on Add</label>{' '}
                                    <input
                                        type="checkbox"
                                        name="disabledBalanceOnAdd"
                                        checked={!!disabledBalanceOnAdd}
                                        onChange={this.setDisableBalanceOnAdd}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="disabledBalanceOnEdit">Disable Balance on Edit</label>{' '}
                                    <input
                                        type="checkbox"
                                        name="disabledBalanceOnEdit"
                                        checked={!!disabledBalanceOnEdit}
                                        onChange={this.setDisableBalanceOnEdit}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

Settings.propTypes = {
    auth: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
    state => ({
        auth: state.firebase.auth,
        settings: state.settings
    }), {
        setAllowRegistration,
        setDisableBalanceOnAdd,
        setDisableBalanceOnEdit
    }
)(Settings);
