import { useDataContext } from '@/context/user';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { ContainerThoughtHomeProps } from "@/types/home-types";
import { useRef } from 'react';

import QuotationMark from '@/app/assets/quotationMarkIcon.svg';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

import './ContainerThoughtHome.css';

const ContainerThoughtHome = ({books, isTablet, isDesktop}: ContainerThoughtHomeProps) => {
    const {setBookId} = useDataContext();
    const router = useRouter();
    const nextEl = useRef(null);
    const prevEl = useRef(null);

    const handleBookDetails = (bookId: string) => {
        setBookId(bookId);
        router.push(`/feed/book-details/${bookId}`);
    }

    return (
        <section className='external-home-container-thoughts'>
            <Swiper
                className='home-container-thoughts'
                modules={[Navigation]}
                slidesPerView={isDesktop ? 3 : (isTablet ? 2.7 : 1.4)}
                slidesPerGroup={isDesktop ? 3 : (isTablet ? 2 : 1)}
                navigation={{
                    nextEl: nextEl.current,
                    prevEl: prevEl.current
                }}
            >
                {books
                    .filter(book => book.Thought && book.Thought.length > 0)
                    .sort(() => Math.random() - 0.5)
                    .slice(0,12)
                    .map((book) => (
                        <SwiperSlide key={book.id} onClick={() => handleBookDetails(book.id)}>
                            {book.Thought &&
                                <section className='default-thought-home'>
                                    <img src={QuotationMark} alt='Quotation mark' className='quotation-mark-thoughts'/>
                                    <div className='content-thought-home'>
                                        <h4 className='text-thought-home'>{book.Thought[0].text}</h4>
                                        <span className='author-thought-home'>{book.AuthorBook[0].author.name}</span>
                                    </div>
                                </section>}
                        </SwiperSlide>
                    ))}
            </Swiper>
            {isDesktop && (
                <>
                    <div ref={nextEl} className="swiper-button-next swiper-button-next-thoughts"></div>
                    <div ref={prevEl} className="swiper-button-prev swiper-button-prev-thoughts"></div>
                </>
            )}
        </section>
    )
}

export default ContainerThoughtHome;