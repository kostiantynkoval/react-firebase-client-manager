import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../types'

export const showNotification = (message, messageType) => {
    return {
        type: SHOW_NOTIFICATION,
        payload: {
            message,
            messageType
        }
    }
}

export const hideNotification = () => {
    return {
        type: HIDE_NOTIFICATION
    }
}