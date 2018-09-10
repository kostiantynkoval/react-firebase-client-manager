import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../types'

const initialState = {
    message: null,
    messageType: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            const { message, messageType } = action.payload
            return {
                ...state,
                message,
                messageType
            }
        case HIDE_NOTIFICATION:
            return {
                ...state,
                message: null,
                messageType: null
            }
        default:
            return state
    }
}