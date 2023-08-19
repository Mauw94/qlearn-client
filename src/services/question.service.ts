import type { Difficulty } from "../domain/enum/difficulty.enum";
import { mapToDomain, mapToDomainList } from "../domain/mappers/question.mapper";
import type { Question } from "../domain/models/question.model";
import { Answer, InitMathArithmeticQuestionsCache, BaseUrl, fetchAll, next, InitHistoryQuestionsCache } from "../infra/questions.api";

export async function initMathArithmeticQuestionsCache(difficulty: Difficulty, clientId: string): Promise<boolean> {
    try {
        const response = await fetch(BaseUrl() + InitMathArithmeticQuestionsCache(difficulty, clientId), {
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

export async function initHistoryQuestionsCache(clientId: string): Promise<boolean> {
    try {
        const response = await fetch(BaseUrl() + InitHistoryQuestionsCache(clientId), {
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
        const response = await fetch(BaseUrl() + fetchAll + clientId, {
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
        const response = await fetch(BaseUrl() + next + clientId, {
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
        const response = await fetch(BaseUrl() + Answer(clientId, answer, questionId), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();
        return result ? true : false;
    } catch (err) {
        console.error(err);
    }

    return false;
}