import { AuthorProps } from "@/app/(pages)/(logged-routes)/feed/author-details/[id]/page";
import { BookProps } from "./books";

export interface headerOnboarding {
    title: string;
    step: number;
}

export interface Genre {
    id: string;
    gender: string;
}

export interface GenresOnboardingProps {
    selectedGenres: Genre[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
    page: string;
}

export interface Author {
    id: string;
    name: string;
    imageUrl: string;
    Genders: { gender: { id: string; gender: string } }[];
}

export interface AuthorsOnboarding {
    selectedAuthors: AuthorProps[];
    setSelectedAuthors: React.Dispatch<React.SetStateAction<AuthorProps[]>>;
}

export interface Book {
    id: string;
    imageUrl: string;
    name: string;
    AuthorBook: {
        author: Author;
    }[];
}

export interface BooksOnboardingProps {
    selectedBooks: BookProps[];
    setSelectedBooks: React.Dispatch<React.SetStateAction<BookProps[]>>;
}

export interface Onboarding {
    [key: string]: string[];
}

export interface FooterOnboardingProps {
    selectedItems: BookProps[] | AuthorProps[] | Genre[];
    page: string;
    title: string;
}