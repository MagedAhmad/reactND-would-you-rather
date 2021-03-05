import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const GET_USERS = "get_users";
export const SAVE_USER_ANSWER = 'save_user_answer'

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

export function handleSaveUserAnswer(authUser, qid, answer) {
    return dispatch => {
      dispatch(saveUserAnswer(authUser, qid, answer));
      dispatch(addAnswerToQuestion(authUser, qid, answer));
  
      return saveQuestionAnswer(authUser, qid, answer);
    };
}