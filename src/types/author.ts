import { BookProps } from "./book";

export interface AuthorProps {
  id: string;
  name: string;
  imageUrl: string;
  birthplace: string;
  carrerDescription: string;
  counterGrade: number;
  totalGrade: number;
  avgGrade: number;
  AuthorBook?: AuthorBookProps[];
  Genders?: { gender: { id: string; gender: string } }[];
}

export interface AuthorBookProps {
  book: BookProps;
}