export interface headerOnboarding {
    title: string;
    step: number;
}

export interface Genre {
    id: string;
    gender: string;
}

export interface GenresOnboarding {
    selectedGenres: Genre[];
    setSelectedGenres: React.Dispatch<React.SetStateAction<Genre[]>>;
}

export interface Author {
    id: string;
    name: string;
    imageUrl: string;
    Genders: { gender: { id: string; gender: string } }[];
}

export interface AuthorsOnboarding {
    selectedAuthors: Author[];
    setSelectedAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
}

export interface Book {
    id: string;
    imageUrl: string;
    name: string;
    AuthorBook: {
        author: Author;
    }[];
}

export interface BooksOnboarding {
    selectedBooks: Book[];
    setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export interface Onboarding {
    genresId: string[],
    authorsId: string[],
    booksId: string[]
}

export interface FooterOnboarding {
    selectedItems: Book[] | Author[] | Genre[];
    page: string;
    title: string;
}