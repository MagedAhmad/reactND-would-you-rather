export const SET_AUTHED_USER = 'set_authed_user'

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}