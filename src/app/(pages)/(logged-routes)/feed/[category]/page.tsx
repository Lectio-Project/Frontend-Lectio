'use client';

import api from '@/api/api';
import BookHighlight from '@/app/components/BookHighlight/BookHighlight';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import { useDataContext } from '@/context/user';
import { BookProps } from '@/types/book';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import './category.css';

type categoriesParams = {
    params: { category: string };
};
export default function Category({ params }: categoriesParams) {
    const { booksSelected, setBooksSelected, feedTopicsTitles } =
        useDataContext();
    const [isLoading, setIsLoading] = useState(false);
    const titleSelected = feedTopicsTitles[params.category];
    const session = useSession();
    const paramsValue =
        params.category === 'sexGenderAuthor' ? 'woman' : 'true';

    async function getData() {
        try {
            const response = await api.get(
                `/search/categories?${params.category}=${paramsValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${session.data?.token}`
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
    }, [session]);

    return (
        <>
            <Header select="feed" search="able" />
            <div className="category-container">
                {isLoading || !booksSelected ? (
                    <Loading />
                ) : (
                    <div className="category-selected">
                        <h1>{titleSelected as string}</h1>
                        <div className="category">
                            {booksSelected.map((book) => {
                                return (
                                    <BookHighlight book={book} key={book.id} />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
