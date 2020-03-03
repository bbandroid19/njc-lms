export class Option {
    id: number;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        // this.id = data.id;
        // this.questionId = data.questionId;
        this.name = data.value;
        this.isAnswer = data.is_answer;
    }
}
