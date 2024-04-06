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

export default function Feed() {
  const authorsHighlight = [
    { name: 'Daniela Arbex', description: 'Conheça mais sobre a jornalista que documenta eventos históricos e as vidas afetadas por essas tragédias.', img: DanielaImg },
    { name: 'Conceição Evaristo', description: 'Vencedora do Prêmio Jabuti e uma das figuras mais proeminentes da Literatura Brasileira, mergulhe nos mundos construídos por Conceição.', img: ConceicaoImg },
    { name: 'Machado de Assis', description: 'Um dos maiores autores clássicos da nossa literatura, veja Assis além das recomendações escolares.', img: MachadoImg },
    { name: 'Ruth Rocha', description: 'Com mais de 50 anos de carreira e uma vasta lista de produções de literatura infantil, Ruth fez parte da infância de inúmero brasileiros.', img: ruthImg }
  ]

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
          <SwiperSlide>
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
    </>
  )
}