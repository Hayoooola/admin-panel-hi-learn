import IComment from "../comments";
import { ICategoryID, ICreator } from "../course-data";

export default interface IArticle {
    body: React.ReactElement,
    cover: string,
    createdAt: string,
    updatedAt: string;
    comments: IComment[];
    creator: ICreator;
    categoryID: ICategoryID;
    description: string;
    publish: boolean;
    shortName: string;
    title: string,
    _id: string;
}