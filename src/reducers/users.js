import { GET_USERS, SAVE_USER_ANSWER, SAVE_USER_QUESTION } from '../actions/users';
  
export function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_USER_ANSWER:
            return {
                ...state,
                [action.auth]: {
                ...state[action.auth],
                answers: {
                    ...state[action.auth].answers,
                    [action.qid]: action.option
                }
                }
            };
        case SAVE_USER_QUESTION:
            return {
                ...state,
                [action.authedUser]: {
                  ...state[action.authedUser],
                  questions: state[action.authedUser].questions.concat([action.qid])
                }
            };
        default:
            return state;
    }
}
