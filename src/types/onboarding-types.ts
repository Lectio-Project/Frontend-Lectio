export interface headerOnboarding {
    title: string;
    step: number;
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
    publishingCompany: string;
}

export interface BooksOnboarding {
    selectedBooks: Book[];
    setSelectedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

export interface FooterOnboarding {
    selectedItems: Book[] | Author[];
    page: string;
}