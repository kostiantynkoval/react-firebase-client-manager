import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types'

const Notification = ({message, messageType}) => {
    const className = classnames('alert', {
        'alert-success': messageType === 'success',
        'alert-danger': messageType === 'error'
    })
    return (
        <div className={className}>
            {message}
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired
};

export default Notification;
