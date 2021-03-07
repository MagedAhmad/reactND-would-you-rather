import { addAnswerToQuestion } from '../actions/questions';
import { saveQuestionAnswer } from '../utils/api';

export const GET_USERS = "get_users";
export const SAVE_USER_ANSWER = 'save_user_answer'
export const SAVE_USER_QUESTION = 'save_user_answer'

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

export function saveUserQuestion (authedUser, optionOne, optionTwo) {
  return {
    type: SAVE_USER_QUESTION,
    authedUser,
    optionOne,
    optionTwo
  }
}

export function handleSaveUserAnswer(auth, qid, answer) {
    return (dispatch) => {
      return saveQuestionAnswer(auth, qid, answer).then(() => {
        dispatch(saveUserAnswer(auth, qid, answer));
        dispatch(addAnswerToQuestion(auth, qid, answer));
      })
    }
}