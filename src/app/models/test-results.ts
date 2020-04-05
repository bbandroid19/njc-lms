import { Answer } from "./answer";
export class TestResults {
  id: number;
  answers: Answer[];
  attempt_number: number;
  category: {
    category_id: string;
    category_name: string;
  };
  end_time: string;
  enrollment_id: string;
  percentage_score: string;
  quiz_id: string;
  status: string;
  total_score: any;
  user_id: string;

  constructor(data: any) {
    data = data || {};
    console.log(data);
    this.id = data._id;
    this.attempt_number = data.attempt_number;
    this.category = data.category;
    this.end_time = data.end_time;
    this.enrollment_id = data.enrollment_id;
    this.percentage_score = data.percentage_score;
    this.quiz_id = data.quiz_id;
    this.status = data.status;
    this.total_score = data.total_score;
    this.user_id = data.user_id;
    data.answers.forEach(a => {
      this.answers.push(new Answer(a));
    });
  }
}
