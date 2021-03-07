import { SET_AUTHED_USER, SET_USER_OUT } from '../actions/authedUser'

export function authedUser(state = null, action)  {
    switch(action.type) {
        case SET_AUTHED_USER:
            return {
                ...state,
                ...action.id
            }
        case SET_USER_OUT:
            return null
        default :
            return state
    }
}