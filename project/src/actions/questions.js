export const GET_QUESTIONS = "get_questions";
export const ADD_ANSWER_TO_QUESTION = 'add_answer_to_question';

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