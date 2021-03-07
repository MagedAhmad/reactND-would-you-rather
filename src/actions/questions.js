import { saveUserQuestion } from './users';
import { saveQuestion } from '../utils/api';

export const GET_QUESTIONS = "get_questions";
export const ADD_ANSWER_TO_QUESTION = 'add_answer_to_question';
export const ADD_QUESTION = 'add_question';

export function getQuestions(questions) {
    return { 
        type: GET_QUESTIONS, 
        questions 
    };
}

export function addAnswerToQuestion(authUser, qid, answer) {
    return {
      type: ADD_ANSWER_TO_QUESTION,
      authUser,
      qid,
      answer
    };
}

export function addQuestion (question) {
    return {
      type: ADD_QUESTION,
      question
    }
}

export function handleAddQuestion (question) {
    return (dispatch) => {
      return saveQuestion(question).then((question) => {
        dispatch(addQuestion(question))
        dispatch(saveUserQuestion(question))
      })
    }
}