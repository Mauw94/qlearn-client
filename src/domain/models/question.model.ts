export class Question {
    id: string;
    question: string;
    answer: string;

    constructor(id: string, question: string, answer: string) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}