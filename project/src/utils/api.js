import {
    _getQuestions, _getUsers,   _saveQuestionAnswer
} from './_DATA.js'
  
export function getInitialData () {
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions]) => ({
        users,
        questions,
    }))
}

export function saveQuestionAnswer(authUser, qid, option) {
    return _saveQuestionAnswer({ authUser, qid, option });
}