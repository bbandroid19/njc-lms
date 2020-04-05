export class Answer {
  question_id: string;
  score: any;
  selected_answers: string[];
  status: string;
  constructor(data: any) {
    data = data || {};
    console.log(data);
    this.question_id = data.question_id;
    this.score = data.score;
    this.selected_answers = data.selected_answers;
    this.status = data.status;
  }
}
