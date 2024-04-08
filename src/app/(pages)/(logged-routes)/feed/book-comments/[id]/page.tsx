'use client';

import api from '@/api/api';
import Comment from '@/app/components/Comment/Comment';
import Header from '@/app/components/Header/Header';
import Loading from '@/app/components/Loading/loading';
import { useDataContext } from '@/context/user';
import { CommentProps } from '@/types/comment';
import { useEffect, useState } from 'react';
import './book-comments.css';
type BookDetailsProps = {
    params: { id: string };
};

export default function BookComments({ params }: BookDetailsProps) {
    const [commentWithText, setCommentWithText] = useState<CommentProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { userData } = useDataContext();

    const bookId = params.id;
    async function handleBookData() {
        try {
            const response = await api.get(`/books/${bookId}?add=comment`, {
                headers: {
                    authorization: `Bearer ${userData.token}`
                }
            });

            const commentText = response.data.Comment.filter(
                (comment: CommentProps) => comment.text
            );
            setCommentWithText(commentText);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleBookData();
    }, []);
    return isLoading ? (
        <div className="container-book-loading">
            <Loading />
        </div>
    ) : (
        <>
            <Header search="able" select="feed" />

            <section className="comments-more">
                <div className="comments-more-div-title">
                    <h1 className="comments-more-title">Comentários</h1>
                    <span>{commentWithText.length} comentários publicados</span>
                </div>
                <article className="comments-more-article">
                    {commentWithText.map((comment: CommentProps) => (
                        <Comment {...comment} key={comment.id} />
                    ))}
                </article>
            </section>
        </>
    );
}
