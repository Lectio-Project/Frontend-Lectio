import { Rating } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useDataContext } from "@/context/user";
import { ContainerBookHome } from "@/types/home-types";

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ContainerBookHome.css';

const ContainerBookHome = ({books, isTablet, isDesktop, sort}: ContainerBookHome) => {
    const {setBookId} = useDataContext();

    let displayedBooks = books;

    if (sort) {
        displayedBooks = [...books].sort((a, b) => b.avgGrade - a.avgGrade);
    }

    return (
        <Swiper
            className='home-container-books'
            modules={[Navigation, Pagination]}
            slidesPerView={isDesktop ? 6 : (isTablet ? 4 : 1.95)}
            slidesPerGroup={isDesktop ? 6 : (isTablet ? 4 : 2)}
            pagination={{ clickable: true }}
            navigation={isDesktop ? true : false}
        >
            {displayedBooks.slice(0,12).map((book) => (
                <SwiperSlide key={book.id} onClick={() => setBookId(book.id)}>
                    <section className='default-book-list-home'>
                        <img src={book.imageUrl} className='book-image-home'/>
                        <section className='info-book-home'>
                            <h4 className='book-title-home'>{book.name}</h4>
                            <span className='book-author-home'>{book.AuthorBook[0].author.name}</span>
                            <div className='container-book-rating-home'>
                                <Rating className='book-rating-star-home' max={1} value={1} size='large' readOnly />
                                <span className='book-rating-home'>{book.avgGrade.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
                            </div>
                        </section>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ContainerBookHome;