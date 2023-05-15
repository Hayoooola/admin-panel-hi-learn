import { ICreator } from "../course-data";

export default interface IComment {
    answer: number,
    answerContent: string | null,
    body: string | null;
    course: string;
    createdAt: string;
    creator: ICreator;
    isAnswer: number;
    score: number;
    _id: string;
}