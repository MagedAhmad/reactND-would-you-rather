export const GET_QUESTIONS = "get_questions";

export function getQuestions(questions) {
    return { 
        type: GET_QUESTIONS, 
        questions 
    };
}
