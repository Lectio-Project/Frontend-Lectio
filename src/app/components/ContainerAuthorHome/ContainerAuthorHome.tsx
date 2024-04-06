import { useDataContext } from '@/context/user';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ContainerAuthorHomeProps } from "@/types/home-types";

import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';

import './ContainerAuthorHome.css';
import { useRouter } from 'next/navigation';

const ContainerAuthorHome = ({authors, isTablet, isDesktop}: ContainerAuthorHomeProps) => {
    const {setAuthorId} = useDataContext();
    const router = useRouter();

    const handleAuthorDetails = (authorId: string) => {
        setAuthorId(authorId);
        router.push(`/feed/author-details/${authorId}`);
    }

    return (
        <Swiper
            className='home-container-authors'
            modules={[Navigation]}
            slidesPerView={isDesktop ? 3 : (isTablet ? 2.7 : 1.4)}
            slidesPerGroup={isDesktop ? 3 : (isTablet ? 2 : 1)}
            navigation={isDesktop ? true : false}
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
    )
}

export default ContainerAuthorHome;