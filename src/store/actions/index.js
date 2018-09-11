import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, ALLOW_REGISTRATION, DISABLE_BALANCE_ON_EDIT, DISABLE_BALANCE_ON_ADD } from '../types'

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

export const setAllowRegistration = () => {
    const allowRegistration = toggleInLocalStorage('allowRegistration')
    return {
        type: ALLOW_REGISTRATION,
        payload: allowRegistration
    }
}

export const setDisableBalanceOnEdit = () => {
    const disabledBalanceOnEdit = toggleInLocalStorage('disabledBalanceOnEdit')
    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: disabledBalanceOnEdit
    }
}

export const setDisableBalanceOnAdd = () => {
    const disabledBalanceOnAdd = toggleInLocalStorage('disabledBalanceOnAdd')
    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: disabledBalanceOnAdd
    }
}

const toggleInLocalStorage = property => {
    // Get settings from localStorage
    const settings = JSON.parse(localStorage.getItem('settings'))
    settings[property] = !settings[property]
    // Set toggled value back to localStorage
    localStorage.setItem('settings',JSON.stringify(settings))
    return settings[property]
}