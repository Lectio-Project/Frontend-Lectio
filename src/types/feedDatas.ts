import { BookProps } from "./book";

export interface ObjectProps {
  [key: string]: string | BookProps[] | undefined;
}

export interface ResponseBooks extends ObjectProps {
  isMove?: [];
  bestRated?: [];
  sexGenderAuthor?: [];
  literaryAwards?: [];
  weekPopulater?: [];
}