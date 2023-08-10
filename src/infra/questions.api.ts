export const baseUrl: string = "http://localhost:3000/question/";
export const initCache: string = "init/"
export const fetchAll: string = "all/";
export const next: string = "get_next/";
export const Answer = (clientId: string, answer: string, questionId: string) => { return `answer/${clientId}/${answer}/${questionId}` }
