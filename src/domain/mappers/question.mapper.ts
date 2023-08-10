import { Question } from "../models/question.model";

export function mapToDomainList(data: any[]): Question[] {
    const resultList: Question[] = [];
    data.forEach(item => {
        resultList.push(new Question(item.id, item.question, item.answer));
    });

    return resultList;
}

export function mapToDomain(data: any): Question {
    return new Question(data.id, data.question, data.answer);
}