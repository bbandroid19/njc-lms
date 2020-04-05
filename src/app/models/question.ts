import { Option } from "./option";

export class Question {
  id: number;
  name: string;
  questionTypeId: number;
  options: Option[];
  answered: boolean;
  isCorrect: boolean;
  selected_answer: string;

  constructor(data: any) {
    data = data || {};
    this.id = data._id;
    this.name = data.question;
    this.questionTypeId = data.questionTypeId;
    this.selected_answer = "";
    this.options = [];
    this.isCorrect = false;
    data.options.forEach(o => {
      this.options.push(new Option(o));
    });
  }
}
