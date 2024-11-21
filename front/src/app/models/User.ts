import Topic from "./Topic";

export default interface User {
    id: number;
    email: string;
    username: string;
    topics: Topic[];
}