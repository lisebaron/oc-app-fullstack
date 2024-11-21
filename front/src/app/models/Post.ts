import Comment from "./Comment";
export default interface Post {
    id: number;
    title: string;
    createdAt: Date;
    authorName: string;
    topicName: string;
    content: string;
    comments: Comment[];
}