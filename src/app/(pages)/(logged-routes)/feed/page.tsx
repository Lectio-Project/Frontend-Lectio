'use client'

import Header from "@/app/components/Header/Header";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './feed.css';

import ConceicaoImg from '../../../assets/conceicaoevaristo.svg';
import DanielaImg from '../../../assets/danielaarbex.svg';
import MachadoImg from '../../../assets/machadodeassis.svg';
import ruthImg from '../../../assets/ruthrocha.svg';
import BookFeed from "@/app/components/BookFeed/BookFeed";
import { useEffect, useState } from "react";
import api from "@/api/api";
import { getToken } from "next-auth/jwt";
import { getCookie } from "@/utils/cookies";
import { useSession } from "next-auth/react";

export default function Feed() {
  const authorsHighlight = [
    { id: 1, name: 'Daniela Arbex', description: 'Conheça mais sobre a jornalista que documenta eventos históricos e as vidas afetadas por essas tragédias.', img: DanielaImg },
    { id: 2, name: 'Conceição Evaristo', description: 'Vencedora do Prêmio Jabuti e uma das figuras mais proeminentes da Literatura Brasileira, mergulhe nos mundos construídos por Conceição.', img: ConceicaoImg },
    { id: 3, name: 'Machado de Assis', description: 'Um dos maiores autores clássicos da nossa literatura, veja Assis além das recomendações escolares.', img: MachadoImg },
    { id: 4, name: 'Ruth Rocha', description: 'Com mais de 50 anos de carreira e uma vasta lista de produções de literatura infantil, Ruth fez parte da infância de inúmero brasileiros.', img: ruthImg }
  ]

  const [books, setBooks] = useState({})

  const session = useSession()

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await api.get('/search/categories?isMovie=true&sexGenderAuthor=women&literaryAwards=true&weekPopulater=true&bestRated=true', {
          headers: {
            Authorization: `Bearer ${session.data?.token}`
          }
        })
        
        const booksFound = response.data;
        setBooks(booksFound)
      } catch (error) {
        console.log(error)
      }
    }

    getBooks()
  }, [])

  console.log(books)

  return (
    <>
      <Header search="disabled" select="feed" />
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {authorsHighlight.map((author) => (
          <SwiperSlide key={author.id}>
            <div className="container-slider">
              <section className="slider" style={{ backgroundImage: `url(${author.img})` }}>
                <h1>{author.name}:</h1>
                <p>{author.description}</p>
              </section>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <BookFeed title="Popular da Semana" />
      <BookFeed title="Mais bem avaliados" />
      <BookFeed title="Livros que foram para as telonas" />
      <BookFeed title="Vencedores do Prêmio Jabuti" />
      <BookFeed title="Autoras mulheres" />
    </>
  )
}