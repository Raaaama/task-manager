export interface ITask {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  user: string;
  __v: number;
  important: boolean;
}