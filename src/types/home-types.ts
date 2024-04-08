import { AuthorProps } from "./author";
import { Author } from "./onboarding-types";

export interface Book {
    id: string;
    imageUrl: string;
    name: string;
    AuthorBook: {
        author: Author;
    }[];
    avgGrade: number;
    Thought?: Thought[];
}

export interface Thought{
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContainerBookHomeProps {
    books: Book[];
    isTablet: boolean;
    isDesktop: boolean;
    sort?: boolean;
}

export interface ContainerAuthorHomeProps {
    authors: AuthorProps[];
    isTablet: boolean;
    isDesktop: boolean;
}

export interface ContainerThoughtHomeProps {
    books: Book[];
    isTablet: boolean;
    isDesktop: boolean;
}