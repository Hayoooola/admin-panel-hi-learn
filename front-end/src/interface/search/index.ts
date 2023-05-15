import IArticle from "../articles";
import ICourseData from "../course-data";

export default interface ISearch {
    allResultCourses: ICourseData[] | [];
    allResultArticles: IArticle[] | [];
}

