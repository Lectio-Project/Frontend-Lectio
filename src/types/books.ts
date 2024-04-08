import { CommentProps } from "./comments";

export interface BookProps {
  id: string;
  name: string;
  publishYear: string;
  publishingCompany: string;
  synopsis: string;
  imageUrl: string;
  totalGrade: number;
  avgGrade: number;
  counterGrade: number;
  totalPages: string;
  isbn13: string;
  gender: { id: string; gender: string };
  AuthorBook?: {
      author: { id: string; name: string; imageUrl: string };
  }[];
  LiteraryAwards?: { id: string; name: string; year: string }[];
  Comment: CommentProps[];
}