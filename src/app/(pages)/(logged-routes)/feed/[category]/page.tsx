'use client'

import api from "@/api/api";
import BookHighlight from "@/app/components/BookHighlight/BookHighlight";
import Header from "@/app/components/Header/Header";
import { useDataContext } from "@/context/user";
import { BookProps } from "@/types/book";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import './category.css';

type categoriesParams = {
  params: { category: string }
}
export default function Category({ params }: categoriesParams) {
  const { booksSelected, setBooksSelected, titleSelected } = useDataContext();
  const session = useSession()
  const paramsValue = params.category === 'sexGenderAuthor' ? 'women' : 'true'

  async function getData() {
    try {
      const response = await api.get(`/search/categories?${params.category}=${paramsValue}`, {
        headers: {
          Authorization: `Bearer ${session.data?.token}`
        }
      })

    if (params.category === 'literaryAwards') {
      const { literaryAwards } = response.data;

      const literaryAwardJabuti: BookProps[] = literaryAwards.filter((bookAward: BookProps) => {
        const jabutiAward = bookAward.LiteraryAwards?.some((book) => {  
          return book.name.includes('Jabuti') || book.name.includes('jabuti')
        })

        return jabutiAward && bookAward
      })

      setBooksSelected(literaryAwardJabuti)
      return
    }

    setBooksSelected(response.data)
   
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!booksSelected.length) {
      console.log(true)
      getData();
    }
  }, [session])

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