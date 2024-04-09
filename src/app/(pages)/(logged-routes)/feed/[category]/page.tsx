'use client';

import api from '@/api/api';
import BookHighlight from '@/app/components/BookHighlight/BookHighlight';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import { useDataContext } from '@/context/user';
import { BookProps } from '@/types/book';
import { useEffect, useState } from 'react';
import './category.css';

type categoriesParams = {
    params: { category: string };
};
export default function Category({ params }: categoriesParams) {
    const { booksSelected, setBooksSelected, feedTopicsTitles, userData } =
        useDataContext();
    const [isLoading, setIsLoading] = useState(false);
    const titleSelected = feedTopicsTitles[params.category];
    const paramsValue =
        params.category === 'sexGenderAuthor' ? 'woman' : 'true';

    async function getData() {
        try {
            const response = await api.get(
                `/search/categories?${params.category}=${paramsValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`
                    }
                }
            );

            if (params.category === 'literaryAwards') {
                const { literaryAwards } = response.data;

                const literaryAwardJabuti: BookProps[] = literaryAwards.filter(
                    (bookAward: BookProps) => {
                        const jabutiAward = bookAward.LiteraryAwards?.some(
                            (book) => {
                                return (
                                    book.name.includes('Jabuti') ||
                                    book.name.includes('jabuti')
                                );
                            }
                        );

                        return jabutiAward && bookAward;
                    }
                );

                setBooksSelected(literaryAwardJabuti);
                return;
            }

            setBooksSelected(response.data[params.category]);
            setIsLoading(false);
        } catch (error) {
            //
        }
    }

    useEffect(() => {
        if (!booksSelected) {
            setIsLoading(true);
            getData();
        }
    }, []);

    return (
        <div className='container-feed-category'>
            <Header select="feed" search="able" />
            <div className="category-container">
                {isLoading || !booksSelected ? (
                    <div className='loading-feed-category'>
                        <Loading />
                    </div>
                ) : (
                    <div className="category-selected">
                        <h1>{titleSelected as string}</h1>
                        <div className="category">
                            {booksSelected.map((book) => {
                                return (
                                    <BookHighlight
                                        book={book as BookProps}
                                        key={book.id}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
