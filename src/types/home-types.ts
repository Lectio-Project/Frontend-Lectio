import { Author } from "./onboarding-types";

export interface Book {
    id: string;
    imageUrl: string;
    name: string;
    AuthorBook: {
        author: Author;
    }[];
    avgGrade: number;
}

export interface ContainerBookHome {
    books: Book[];
    isTablet: boolean;
    isDesktop: boolean;
}