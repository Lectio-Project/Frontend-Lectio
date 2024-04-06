'use client';

import api from '@/api/api';
import Comment, { CommentProps } from '@/app/components/Comment/Comment';
import Header from '@/app/components/Header/Header';
import { getCookie } from '@/utils/cookies';
import { useEffect, useState } from 'react';
import './book-comments.css';
type BookDetailsProps = {
    params: { id: string };
};

export default function BookComments({ params }: BookDetailsProps) {
    const [commentWithText, setCommentWithText] = useState<CommentProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const bookId = params.id;
    async function handleBookData() {
        try {
            const token = await getCookie('token');
            const response = await api.get(`/books/${bookId}?add=comment`, {
                headers: {
                    authorization: `Bearer ${token}`
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
    return (
        <>
            <Header search="able" select="feed" />

            <section className="comments">
                <div className="comments-div-title">
                    <h1 className="comments-title">Comentários</h1>
                    <span>{commentWithText.length} comentários publicados</span>
                </div>
                <article className="comments-article">
                    {commentWithText.map((comment: CommentProps) => (
                        <Comment {...comment} key={comment.id} />
                    ))}
                </article>
            </section>
        </>
    );
}
