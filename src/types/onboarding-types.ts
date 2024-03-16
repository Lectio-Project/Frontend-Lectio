export interface headerOnboarding {
    title: string;
    step: number;
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
    selectedBooks: Book[];
    page: string;
}