export const GET_USERS = "get_users";
export const SAVE_USER_ANSWER = 'save_user_answer'
export const SAVE_USER_QUESTION = 'save_user_question'

export function getUsers(users) {
    return { 
        type: GET_USERS, 
        users 
    };
}

export function saveUserAnswer (auth, qid, option) {
    return {
      type: SAVE_USER_ANSWER,
      auth,
      qid,
      option
    }
}

export function saveUserQuestion (authedUser, qid) {
  return {
    type: SAVE_USER_QUESTION,
    authedUser,
    qid
  }
}

