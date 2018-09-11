import { ALLOW_REGISTRATION, DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT } from '../types'

export const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case DISABLE_BALANCE_ON_ADD:
            return {
                ...state,
                disabledBalanceOnAdd: action.payload
            }
        case DISABLE_BALANCE_ON_EDIT:
            return {
                ...state,
                disabledBalanceOnEdit: action.payload
            }
        case ALLOW_REGISTRATION:
            return {
                ...state,
                allowRegistration: action.payload
            }
        default:
            return state
    }
}