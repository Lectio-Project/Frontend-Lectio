'use client'

import BookHighlight from "@/app/components/BookHighlight/BookHighlight";
import Header from "@/app/components/Header/Header";
import { useDataContext } from "@/context/user"
import './category.css';

export default function Category() {
  const { booksSelected, titleSelected } = useDataContext();
  console.log(booksSelected)
  return (
    <>
      <Header select="feed" search="able" />
      <div className="category-selected">
        <h1>{titleSelected}</h1>
        <div className="category">
          {booksSelected && booksSelected.map((book) => {
            return (
              <BookHighlight book={book} key={book.id} />
            )
          })}
        </div>
      </div>
    </>
  )
}