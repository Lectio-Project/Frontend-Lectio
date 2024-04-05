import { Author } from "./onboarding-types";

export interface Book {
    id: string;
    imageUrl: string;
    name: string;
    publishYear: string;
    AuthorBook: {
        author: Author;
    }[];
    avgGrade: number;
    gender: {
        gender: string;
    }
}

export interface SearchBooks {
    results: Book[];
}