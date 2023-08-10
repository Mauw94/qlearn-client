import type { Difficulty } from "../domain/enum/difficulty.enum";

export const BaseUrl = () => {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV === 'production' ? 'https://qlearn-api.azurewebsites.net/question/' : 'http://localhost:3000/question/';
}
export const InitCache = (difficulty: Difficulty, clientId: string) => { return `init/${difficulty}/${clientId}` }
export const fetchAll: string = "all/";
export const next: string = "get_next/";
export const Answer = (clientId: string, answer: string, questionId: string) => { return `answer/${clientId}/${answer}/${questionId}` }
