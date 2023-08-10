import { mapToDomain, mapToDomainList } from "../domain/mappers/question.mapper";
import type { Question } from "../domain/models/question.model";
import { Answer, baseUrl, fetchAll, initCache, next } from "../infra/questions.api";

export async function initQuestionsCache(clientId: string): Promise<boolean> {
    try {
        const response = await fetch(baseUrl + initCache + clientId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.ok ? true : false;
    } catch (err) {
        console.error('Error while initializing cache:', err);
    }

    return false;
}

export async function fetchQuestions(clientId: string): Promise<Question[] | undefined> {
    try {
        const response = await fetch(baseUrl + fetchAll + clientId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            const result = mapToDomainList(data);
            return result as Question[];
        }
    } catch (err) {
        console.error(err);
    }

    return undefined;
}

export async function fetchNextQuestion(clientId: string): Promise<Question | undefined> {
    try {
        const response = await fetch(baseUrl + next + clientId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            const result = mapToDomain(data);
            return result as Question;
        }
    } catch (err) {
        console.error(err);
    }

    return undefined;
}

export async function answerQuestion(clientId: string, answer: string, questionId: string): Promise<boolean> {
    try {
        const response = await fetch(baseUrl + Answer(clientId, answer, questionId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.ok);
        return response.ok ? true : false;
    } catch (err) {
        console.error(err);
    }

    return false;
}