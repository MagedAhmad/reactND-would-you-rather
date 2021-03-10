import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

import { getUsers, saveUserAnswer, saveUserQuestion } from "./users";
import { addAnswerToQuestion, addQuestion, getQuestions } from "./questions";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(getUsers(users));
                dispatch(getQuestions(questions));
                dispatch(hideLoading());
            })
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


export function handleAddQuestion (optionOneText, optionTwoText, authedUser) {
    return (dispatch) => {
      return saveQuestion({optionOneText, optionTwoText, author: authedUser}).then((question) => {
        let qid = question.id
        dispatch(addQuestion(question))
        dispatch(saveUserQuestion(authedUser, qid))
      })
    }
  }