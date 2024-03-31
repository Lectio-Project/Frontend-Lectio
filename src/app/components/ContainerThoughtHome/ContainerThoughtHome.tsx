import { useDataContext } from '@/context/user';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ContainerThoughtHome } from "@/types/home-types";

import QuotationMark from '@/app/assets/quotationMarkIcon.svg';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ContainerThoughtHome.css';

const ContainerThoughtHome = ({books, isTablet, isDesktop}: ContainerThoughtHome) => {
    const {setBookId} = useDataContext();

    return (
        <Swiper
            className='home-container-thoughts'
            modules={[Navigation]}
            slidesPerView={isDesktop ? 6 : (isTablet ? 4 : 1.4)}
            slidesPerGroup={isDesktop ? 6 : (isTablet ? 4 : 1)}
            navigation={isDesktop ? true : false}
        >
            {books.filter(book => book.Thought && book.Thought.length > 0).slice(0,12).map((book) => (
                <SwiperSlide key={book.id} onClick={() => setBookId(book.id)}>
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
    )
}

export default ContainerThoughtHome;