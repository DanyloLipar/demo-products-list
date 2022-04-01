import { Comment } from "./Comment";

export type Product = {
    id: number,
    imageUrl: string,
    name: string,
    count: number,
    size: {
        width: number,
        height: number
    },
    weight: string,
    comments: Comment[],
}