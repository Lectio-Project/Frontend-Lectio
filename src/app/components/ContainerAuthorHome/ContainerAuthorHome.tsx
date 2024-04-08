import { useDataContext } from '@/context/user';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ContainerAuthorHomeProps } from "@/types/home-types";
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

import './ContainerAuthorHome.css';

const ContainerAuthorHome = ({authors, isTablet, isDesktop}: ContainerAuthorHomeProps) => {
    const {setAuthorId} = useDataContext();
    const router = useRouter();
    const nextEl = useRef(null);
    const prevEl = useRef(null);

    const handleAuthorDetails = (authorId: string) => {
        setAuthorId(authorId);
        router.push(`/feed/author-details/${authorId}`);
    }

    return (
        <section className='external-home-container-authors'>
            <Swiper
                className='home-container-authors'
                modules={[Navigation]}
                slidesPerView={isDesktop ? 3 : (isTablet ? 2.7 : 1.4)}
                slidesPerGroup={isDesktop ? 3 : (isTablet ? 2 : 1)}
                navigation={{
                    nextEl: nextEl.current,
                    prevEl: prevEl.current
                }}
            >
                {authors
                    .sort(() => Math.random() - 0.5)
                    .slice(0,12)
                    .map((author) => (
                        <SwiperSlide key={author.id} onClick={() => handleAuthorDetails(author.id)}>
                            <section className='default-author-list'>
                                <img src={author.imageUrl} alt={author.name} className="author-image-home" />

                                <div className='author-division-home'>
                                    <span className="author-title-home">{author.name}</span>
                                    <span className="author-genre-home">{author.Genders.map((item) => item.gender.gender).join(' | ')}</span>
                                </div>
                            </section>
                        </SwiperSlide>
                    ))}
            </Swiper>
            {isDesktop && (
                <>
                    <div ref={nextEl} className="swiper-button-next swiper-button-next-authors"></div>
                    <div ref={prevEl} className="swiper-button-prev swiper-button-prev-authors"></div>
                </>
            )}
        </section>
    )
}

export default ContainerAuthorHome;