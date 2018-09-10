import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = ({history}) => (
    <div className="row">
        <div>
            <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" />{' '}
                Back to Dashboard
            </Link>
        </div>
        <div className="container">
            <h1 className="text-center">404 Not Found</h1>
        </div>
    </div>
)

export default NotFound