export const SET_AUTHED_USER = 'set_authed_user'
export const SET_USER_OUT = 'set_user_out'

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

export function setUserOut() {
    return {
        type: SET_USER_OUT
    }
}